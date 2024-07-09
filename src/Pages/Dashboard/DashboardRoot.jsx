
import Dashboard from "./Dashbord";

import { useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async"; 

const DashboardRoot = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-[#85F4FA]">
      <Helmet>
        <title>বিশ্বস্ত-বাজার | DashboardHome</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet>
    <div className="flex relative">
      <div className="absolute md:static lg:w-auto  grid  top-0 gap-8 lg:gap-8  z-10">
        <Dashboard showSidebar={showSidebar}></Dashboard>
        <div
          className="absolute right-0 top-0 text-right lg:hidden "
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <button className="bg-black text-white p-2 md:hidden">
            {showSidebar && <FaArrowLeft />}
          </button>
        </div>
      </div>
      <div className=" bg-gray-200 lg:ml-44 min-h-screen rounded-lg w-full lg:col-span-2">
        <Outlet></Outlet>
      </div>
    </div>

    <div
      className="absolute left-0 top-0 text-right lg:hidden "
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <button className="bg-black text-white p-2">
        {showSidebar || <FaBars />}
      </button>
    </div>
  </div>
  );
};

export default DashboardRoot;
