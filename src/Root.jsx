import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navber/Navber";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Services from "./Components/Services/Services";
import ClientReview from "./Components/ClientReview/ClientReview";
import AlwaysOrganic from "./Components/AlwaysOrganic/AlwaysOrganic";
import LatestNews from "./Components/LatestNews/LatestNews";
import Guarantee from "./Components/Gurantee/Gurantee";
import PopularProduct from "./Components/PopularProduct/PopularProduct";


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <Services></Services>
            <PopularProduct></PopularProduct>
            <AlwaysOrganic></AlwaysOrganic>
            <ClientReview></ClientReview>
            <LatestNews></LatestNews>
            <Guarantee></Guarantee>
           <div className="min-h-screen">
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;