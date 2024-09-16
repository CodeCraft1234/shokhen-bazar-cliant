import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MdOutlinePayments, MdPeopleOutline } from "react-icons/md";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import useLogo from "../../Hook/useLogo";
import { AuthContext } from "../../../Security/AuthProvider";
import { IoIosLogOut } from "react-icons/io";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [logo, setLogo] = useLogo();
  const [latestLogo, setLatestLogo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (logo && logo.length > 0) {
      // Sort the logos based on date in descending order
      const sortedLogo = [...logo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Get the latest logo
      const latest = sortedLogo[0];

      // Set the sorted logo and latest logo state
      setLogo(sortedLogo);
      setLatestLogo(latest);
    }
  }, [logo, setLogo]);

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then().catch();
    navigate("/");
  };

  const getButtonClass = (path) => {
    return `w-full mb-2 text-start  py-2  px-1 rounded-lg focus:outline-none ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : " text-white hover:bg-red-700"
    }`;
  };

  return (
    <div className="overflow-y-auto text-start h-screen">
      <Helmet>
        <title>বিশ্বস্ত-বাজার | AdminDashboard</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet>
      <div className="w-[150px]">
        <div className="flex items-center justify-center mb-8">
          <Link to={"/"}>
            <img
              className="h-24 w:24 lg:w-36 "
              src={latestLogo?.photo}
              alt="Logo"
            />
          </Link>
        </div>

        <nav>
          <div className="space-y-2 text-start">
            <Link to="/dashboard/admin/adminHome">
              <button className={getButtonClass("/dashboard/admin/adminHome")}>
                <RxDashboard className="text-xl inline-block mr-2" />
                Dashboard
              </button>
            </Link>
            <Link to="/dashboard/admin/allOrders">
              <button className={getButtonClass("/dashboard/admin/allOrders")}>
                <MdOutlinePayments className="text-xl inline-block mr-2" />
                Orders
              </button>
            </Link>
            <Link to="/dashboard/admin/allProducts">
              <button className={getButtonClass("/dashboard/admin/allProducts")}>
                <BsCartPlusFill className="text-xl inline-block mr-2" />
                Products
              </button>
            </Link>
            <Link to="/dashboard/admin/addProduct">
              <button className={getButtonClass("/dashboard/admin/addProduct")}>
                <BsCartCheckFill className="text-xl inline-block mr-2" />
                Add Product
              </button>
            </Link>
          
            <Link to="/dashboard/admin/totalCustomers">
              <button className={getButtonClass("/dashboard/admin/totalCustomers")}>
                <MdPeopleOutline className="text-xl inline-block mr-2" />
                Customers
              </button>
            </Link>
            <Link to="/dashboard/admin/settings">
              <button className={getButtonClass("/dashboard/admin/settings")}>
                <AiOutlineSetting className="text-xl inline-block mr-2" />
                Settings
              </button>
            </Link>
            <button
              onClick={handleLogOut}
              className="mr-2 mb-2 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-700 focus:outline-none w-full flex items-center justify-center"
            >
              <IoIosLogOut className="text-xl mr-2" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
