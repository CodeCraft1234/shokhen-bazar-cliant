import AddAddress from "./AddAddress";
import AddBanner from "./AddBanner";
import AddLinks from "./AddLinks";
import AddLogos from "./AddLogos";
import AddNumber from "./AddNumber";
import { Helmet } from "react-helmet-async";


const Settings = () => {
    return (
        <div className=" py-8 mx-4"> 
             <Helmet>
        <title>Shokher Bazar | Settings</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
           <div>
           <AddLogos></AddLogos>
           <AddBanner></AddBanner>
           <AddAddress></AddAddress>
           <AddNumber></AddNumber>
           <AddLinks></AddLinks>
           </div>
          
        </div>
    );
};

export default Settings;