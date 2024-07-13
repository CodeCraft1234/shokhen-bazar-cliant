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
        <div>
            <Banner></Banner>
            <OrganicProduct></OrganicProduct>
            <Services></Services>
            <Product></Product>
            <PopularProduct></PopularProduct>
            <OurProduct></OurProduct>
            <AlwaysOrganic></AlwaysOrganic>
            <ClientReview></ClientReview>
            <LatestNews></LatestNews>
            <Guarantee></Guarantee>
        </div>
    );
};

export default Home;