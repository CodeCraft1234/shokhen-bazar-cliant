import { Helmet } from "react-helmet-async";
import { useState } from "react";
import UseAxiosPublic from "../../Axios/UseAxiosPublic";
import Swal from "sweetalert2";

const AddNumber = () => {
  const [facebookID, setFacebookID] = useState("");

  const AxiosPublic = UseAxiosPublic();

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const date = new Date();
    const numberInfoo = {
      facebookID,

      date,
    };

    AxiosPublic.post("/numbers", numberInfoo).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Number has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    });

    // Reset IDs after submission
    setFacebookID("");
  };

  return (
    <div className="text-white  flex items-center mt-3 justify-center overflow-x-hidden">
      {/* <Helmet>
        <title>বিশ্বস্ত-বাজার | AddNumber</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet> */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Add Number
        </h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          {/* Facebook */}
          <div className="mb-4 flex items-center">
            <input
              type="number"
              id="facebookID"
              name="facebookID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Your Number"
              value={facebookID}
              onChange={(e) => setFacebookID(e.target.value)}
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

export default AddNumber;
