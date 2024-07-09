import { useState } from "react";
import UseAxiosPublic from "../../Axios/UseAxiosPublic";
import Swal from "sweetalert2";
import { FaEdit, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AddLinks = () => {
  const [facebookID, setFacebookID] = useState("");
  const [instagramID, setInstagramID] = useState("");
  const [linkedinID, setLinkedinID] = useState("");
  const [twitterID, setTwitterID] = useState("");
  const [youtubeID, setYoutubeID] = useState("");
  const [whatsappID, setWhatsappID] = useState("");

  const AxiosPublic = UseAxiosPublic(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const usersInfoo = {
      facebookID,
      instagramID,
      linkedinID,
      twitterID,
      youtubeID,
      whatsappID,
      date,
    };

    AxiosPublic.post("/links", usersInfoo).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Link has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    });

    // Reset IDs after submission
    setFacebookID("");
    setInstagramID("");
    setLinkedinID("");
    setTwitterID("");
    setYoutubeID("");
    setWhatsappID("");
  };

  return (
    <div className="text-white mt-3 flex items-center justify-center overflow-x-hidden">
      {/* <Helmet>
        <title>বিশ্বস্ত-বাজার | AddLinks</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet> */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full ">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Add your Links</h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          {/* Facebook */}
          <div className="mb-4 flex items-center">
            <FaFacebook className="text-blue-600 mr-2" />
            <input
              type="text"
              id="facebookID"
              name="facebookID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Facebook URL"
              value={facebookID}
              onChange={(e) => setFacebookID(e.target.value)}
            />
          </div>

          {/* Instagram */}
          <div className="mb-4 flex items-center">
            <FaInstagram className="text-pink-600 mr-2" />
            <input
              type="text"
              id="instagramID"
              name="instagramID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Instagram URL"
              value={instagramID}
              onChange={(e) => setInstagramID(e.target.value)}
            />
          </div>

          {/* Linkedin */}
          <div className="mb-4 flex items-center">
            <FaLinkedin className="text-blue-800 mr-2" />
            <input
              type="text"
              id="linkedinID"
              name="linkedinID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Linkedin URL"
              value={linkedinID}
              onChange={(e) => setLinkedinID(e.target.value)}
            />
          </div>

          {/* Twitter */}
          <div className="mb-4 flex items-center">
            <FaTwitter className="text-blue-400 mr-2" />
            <input
              type="text"
              id="twitterID"
              name="twitterID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Twitter URL"
              value={twitterID}
              onChange={(e) => setTwitterID(e.target.value)}
            />
          </div>

          {/* Youtube */}
          <div className="mb-4 flex items-center">
            <FaYoutube className="text-red-600 mr-2" />
            <input
              type="text"
              id="youtubeID"
              name="youtubeID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Youtube URL"
              value={youtubeID}
              onChange={(e) => setYoutubeID(e.target.value)}
            />
          </div>

          {/* Whatsapp */}
          <div className="mb-4 flex items-center">
            <FaWhatsapp className="text-green-600 mr-2" />
            <input
              type="text"
              id="whatsappID"
              name="whatsappID"
              className="flex-1 text-black p-2 border rounded"
              placeholder="Enter Whatsapp URL"
              value={whatsappID}
              onChange={(e) => setWhatsappID(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-green-600 text-white rounded-lg p-2 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLinks;
