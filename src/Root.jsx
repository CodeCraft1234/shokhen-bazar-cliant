import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navber/Navber";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
           <div className="min-h-screen">
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;