import React from "react";
import Navbar from "../components/Navbar/Navbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import VideoCards from "../components/Dashboard/VideoCards";

const AdminDashboardPage = () => {
  return (
    <>
      <div className='container mx-auto w-full h-screen font-inter font-thin text-white'>
        <Navbar />
        <DashboardHeader />
        <VideoCards />
      </div>
    </>
  );
};

export default AdminDashboardPage;
