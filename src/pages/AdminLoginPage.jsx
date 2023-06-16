import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext } from "../globalContext";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: authDispatch } = React.useContext(AuthContext); // Dispatch from AuthContext
  const { dispatch: globalDispatch } = React.useContext(GlobalContext); // Dispatch from GlobalContext
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    // TODO
    try {
      const authData = await sdk.login(data.email, data.password, "admin");
      navigate("/admin/dashboard");
      globalDispatch({
        type: "SNACKBAR",
        payload: { message: "Login Successful" },
      });
      authDispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: !authData.error,
          user: `${authData.first_name} ${authData.last_name}`,
          token: authData.token,
          role: authData.role,
        },
      });
    } catch (error) {
      setError("password", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 '
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Email'
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className='text-red-500 text-xs italic'>{errors.email?.message}</p>
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='******************'
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.password?.message}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <input
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            value='Sign In'
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
