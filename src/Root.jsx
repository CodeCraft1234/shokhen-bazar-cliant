import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Security/AuthProvider";
import ScrollTop from "./Pages/ScrollTop";
import TheAdmin from "./Pages/TheAdmin";
import NavBar from "./Components/Navber/Navber";
import Footer from "./Components/Footer/Footer";


const Root = () => {
  const location = useLocation();
  const noheaderfooter =
    location.pathname.includes("dashboard") ||
    location.pathname.includes("login") ||
    location.pathname.includes("signup");
    location.pathname.includes("search");

  return (
    <div className="bg-white">
      <ScrollTop />
      {noheaderfooter || <TheAdmin />}
      {noheaderfooter || <NavBar />}
      <div className="min-h-screen overflow-y-hidden max-w-auto mx-auto">
        <Outlet />
      </div>
      {noheaderfooter || <Footer />}
    </div>
  );
};

export default Root;
