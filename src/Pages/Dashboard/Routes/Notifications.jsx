import { Helmet } from "react-helmet-async";


const Notifications = () => {
    return (
        <div className="mt-64"> 
            <Helmet>
              <title> বিশ্বস্ত-বাজার | Notifications</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
        <h6 className="text-red-600 text-center text-3xl">No Notifications Available!</h6>
    </div>
    );
};

export default Notifications;