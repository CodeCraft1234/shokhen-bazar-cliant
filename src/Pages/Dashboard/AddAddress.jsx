import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";


const AddAddress = () => {
    const [facebookIDD, setFacebookID] = useState("");
    const [webID, setWebID] = useState("");

    const AxiosPublic = useAxiosPublic();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const date = new Date();
      const addressInfoo = {
        facebookIDD,
        webID,
        date,
      };

      AxiosPublic.post("/address", addressInfoo).then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Address has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  
      // Reset IDs after submission
      setFacebookID("");
      setWebID("");
    };

    return (
        <div className="text-white  flex items-center mt-3 justify-center overflow-x-hidden">
        <Helmet>
              <title> বিশ্বস্ত-বাজার | Settings</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Company Details
          </h2>
          <form onSubmit={handleSubmit} action="#" method="post">
            {/* Facebook */}
            <div className="mb-4 flex items-center">
              <input
                type="text"
                id="facebookIDD"
                name="facebookIDD"
                className="flex-1 text-black p-2 border rounded"
                placeholder="Enter Your Address"
                value={facebookIDD}
                onChange={(e) => setFacebookID(e.target.value)}
              />
              
            </div>
            <div className="mb-4 flex items-center">
            <input
                type="text"
                id="webID"
                name="webID"
                className="flex-1 text-black p-2 border rounded"
                placeholder="Enter Website Name"
                value={webID}
                onChange={(e) => setWebID(e.target.value)}
              />
            </div>
  
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg p-2 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddAddress;