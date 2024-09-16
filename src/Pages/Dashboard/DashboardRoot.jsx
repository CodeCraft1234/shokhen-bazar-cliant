
import Dashboard from "./Dashbord";

import { useContext, useRef, useState } from "react";
import { FaArrowLeft,FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async"; 
import { FaUsersViewfinder } from "react-icons/fa6";
import { AuthContext } from "../../../Security/AuthProvider";

const DashboardRoot = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isActive = (path) => location.pathname === path;
  const {user}=useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
  className="fixed left-0 top-0 w-full text-left lg:hidden bg-gray-900 p-2 z-5">
  <div className="flex shadow-blue-700 shadow-2xl  justify-between items-center">
  <div className="flex justify-center items-center mx-4 text-2xl gap-7">
      <Link to={'/'}>
        <p className={` ${isActive('/') ? 'text-red-500 border-b-2 border-white' : 'text-white'}`}>
          <FaHome />
        </p>
      </Link>

       <Link to={'/dashboard/myClients'}>
        <p className={` ${isActive('/dashboard/myClients') ? 'text-red-500 border-b-2 border-white' : 'text-white'}`}>
          <FaUsersViewfinder />
        </p>
      </Link>
    </div>

  <div className="items-center">
      {user?.displayName ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Image and Dropdown Toggle */}
          <label
            tabIndex={0}
            className="relative cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              className="h-8 w-8 rounded-full"
              src={user.photoURL}
              alt="Profile"
            />
            {/* Dropdown Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute right-0 bottom-0 h-4 w-4 bg-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
          </label>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul
              tabIndex={0}
              className="absolute mt-3 text-white right-1 z-[1] p-1 rounded-box w-52 shadow-lg bg-[#2e353a]"
            >
              <div className="p-4 text-center">
                <img
                  className="h-16 w-16 rounded-full mx-auto"
                  src={user?.photoURL}
                  alt="Profile"
                />
                <Link
                  className="text-white font-bold"
                  to={'/dashboard/updateProfile'}
                >
                  <h1 className="my-2">
                    {user?.displayName?.split(' ')[0]}
                  </h1>
                </Link>

                <div className="text-start">
                  <div className="text-center">

                   
                    
                    <Link to={'/dashboard/allUsers'}>
                      <p className="text-white text-sm hover:bg-blue-500 bg-[#394148] border border-gray-500 rounded-lg py-1.5 px-3">
                        All Users
                      </p>
                    </Link>
                    <Link to={'/dashboard/history'}>
                      <p className="text-white bg-[#394148] hover:bg-blue-500 text-sm border border-gray-500 rounded-lg py-1.5 px-3 mt-2">
                       All History
                      </p>
                    </Link>
                    <Link to={'/dashboard/AllSummery'}>
                      <p className="text-white bg-[#394148] hover:bg-blue-500 text-sm border border-gray-500 rounded-lg py-1.5 px-3 mt-2">
                        All Summery
                      </p>
                    </Link>
              
                




                    <Link to={'/dashboard/updateProfile'}>
                      <p className="text-white bg-[#394148] hover:bg-blue-500 text-sm border border-gray-500 rounded-lg py-1.5 mt-2 px-3">
                        Update Profile
                      </p>
                    </Link>
                  </div>
                </div>
                <hr className="my-2" />
                {/* Logout Button */}
                <NavLink
                  onClick={handleLogOut}
                  className={({ isActive }) =>
                    isActive
                      ? 'underline text-blue-700'
                      : 'hover:text-gray-600'
                  }
                >
                  <button className="py-1 px-3 rounded-lg bg-red-500 text-white font-bold">
                    Log Out
                  </button>
                </NavLink>
              </div>
            </ul>
          )}
        </div>
      ) : (
        <Link to="/login">
      
          <button className="font-avenir px-3 py-1 bg-neutral rounded text-white">
            Login
          </button>
        </Link>
      )}
    </div>
  </div>
</div>

  </div>
  );
};

export default DashboardRoot;
