import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navber/Navber";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Services from "./Components/Services/Services";
import ClientReview from "./Components/ClientReview/ClientReview";


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <Services></Services>
            <ClientReview></ClientReview>
           <div className="min-h-screen">
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;