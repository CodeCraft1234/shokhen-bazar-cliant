import AdminDashboard from "./AdminDashboard";
import { Helmet } from "react-helmet-async";





const Dashboard = ({ showSidebar }) => {


  return (
        <div
          className={` bg-[#1b1b1b] w-44 min-h-screen lg:fixed text-white  ${
            showSidebar ? "block" : "hidden"
          } md:block`}
        >
          <Helmet>
        <title>Shokher Bazar| Dashboard</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet>
          <ul className="menu  text-center text-base">
               <AdminDashboard></AdminDashboard> 
          </ul>
        </div>
  );
};

export default Dashboard;
