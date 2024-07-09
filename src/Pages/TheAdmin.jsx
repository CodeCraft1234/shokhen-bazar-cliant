import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../../Security/AuthProvider";

const TheAdmin = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
  
    return (
        <div className="top-0 ">
           {
            user &&  <div className="flex justify-start gap-5 py-2 pl-10 lg:pl-10 bg-black text-white  pt-1 md:pt-1 lg:pt-1 z-50 w-full  fixed">
         

          <NavLink className='flex items-center gap-1' to={"/dashboard/admin/adminHome"}>
          <MdDashboard className="text-xs sm:text-sm md:text-base lg:text-lg" />  Dashboard
            </NavLink>
          <NavLink className='flex items-center gap-1' to={"/dashboard/admin/addProduct"}>
          <span><IoIosAddCircle className="text-xs sm:text-sm md:text-base lg:text-lg" /></span>Add Product
            </NavLink>
            </div>
           }
        </div>
    );
};

export default TheAdmin;