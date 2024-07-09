import { useState } from "react";
import UseAxiosPublic from "../../Axios/UseAxiosPublic";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import UseAxiosSecure from "../../Axios/UseAxiosSecure";
// import useAxiosPublic from "../../Axios/UseAxiosPublic";

const AddLogos = () => { 
  const [image, setImage] = useState(null);
  const image_hosting_key = "6fbc3358bbb1a92b78e2dee0f5ca1b94";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const AxiosPublic = UseAxiosPublic();
  //    const AxiosSecure = UseAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Image:", image);

    // Upload image
    const images = { image: image };
    const res = await AxiosPublic.post(image_hosting_api, images, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const photo = res.data.data.display_url;
    console.log(photo);

    const date = new Date();
    const logoInfoo = {
      photo,
      date,
    };
    console.log(logoInfoo);

    // AxiosPublic.post("/logos", logoInfoo).then((res) => {
    //   console.log(res.data);
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Logo has been saved",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // });

    // Post logo to the server
    AxiosPublic.post("/logos", logoInfoo).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logo has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    });

    // Reset the form
    setImage(null);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="text-white  flex items-center justify-center  overflow-x-hidden">
      {/* <Helmet>
              <title> বিশ্বস্ত-বাজার | AddLogo</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet> */}
      <div className="bg-white text-black p-8 rounded-lg shadow-xl w-full ">
        <h2 className="text-2xl font-bold mb-4">Add your Logos</h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          <label htmlFor="image" className="block font-bold mb-1">
            Image Upload:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 mb-4 border rounded"
            accept="image/*"
            required
          />

          <button
            type="submit"
            className="b bg-green-900 text-white rounded-lg p-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLogos;
