import { Helmet } from "react-helmet-async";
import AlwaysOrganic from "../../Components/AlwaysOrganic/AlwaysOrganic";
import Banner from "../../Components/Banner/Banner";
import ClientReview from "../../Components/ClientReview/ClientReview";
import Guarantee from "../../Components/Gurantee/Gurantee";
import LatestNews from "../../Components/LatestNews/LatestNews";
import OrganicProduct from "../../Components/OrganicProduct/OrganicProduct";
import OurProduct from "../../Components/OurProduct/OurProduct";
import PopularProduct from "../../Components/PopularProduct/PopularProduct";
import Product from "../../Components/Products/Products";
import Services from "../../Components/Services/Services";


const Home = () => {
    return (
        <div className="overflow-hidden">
             <Helmet>
        <title>Shokher Bazar | Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
            <Banner></Banner>
            <OrganicProduct></OrganicProduct>
            <Services></Services>
            <Product></Product>
            <AlwaysOrganic></AlwaysOrganic>
            <ClientReview></ClientReview>
            <LatestNews></LatestNews>
            <Guarantee></Guarantee>
        </div>
    );
};

export default Home;