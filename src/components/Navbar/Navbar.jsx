import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons_left.webp";
import { AuthContext } from "../../authContext";

const Navbar = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  return (
    <div className='flex justify-between items-center mb-28'>
      <Link to='/' className='text-white font-black text-5xl'>
        APP
      </Link>
      <button
        onClick={handleLogout}
        className='bg-primary text-black px-6 py-3 rounded-[40px] flex gap-1'
      >
        <img src={LogoutIcon} alt='Logout icon' /> <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
