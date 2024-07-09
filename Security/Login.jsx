import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../src/Components/firebase/firebase.config";

import { Helmet } from "react-helmet-async"; 
import useLogo from "../src/Hook/useLogo";

const Login = () => {
  const { signIn, googleSignIn, facebookSignin, githubLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/dashboard/admin/adminHome");
        toast.success("Google login successful");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google login failed");
      });
  };

  const handleFacebook = () => {
    facebookSignin()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/dashboard/admin/adminHome");
        return toast.success("Facebook login successful");
      })
      .catch((error) => {
        console.log(error);
        return toast.error("Facebook login failed");
      });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/dashboard/admin/adminHome");
        Swal.fire({
          title: "Login successful!",
          text: "You have logged in successfully.",
          icon: "success"
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Wrong password or email.",
          icon: "error"
        });
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Please enter your email to reset password.",
        icon: "error"
      });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Check your email to reset your password.",
          icon: "success"
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Failed to send reset email.",
          icon: "error"
        });
      });
  };

  const [logo, setLogo] = useLogo();
  const [latestLogo, setLatestLogo] = useState(null);
  console.log(latestLogo);

  useEffect(() => {
    if (logo && logo.length > 0) {
      // Sort the logos based on date in descending order
      const sortedLogo = [...logo].sort((a, b) => new Date(b.date) - new Date(a.date));

      // Get the latest logo
      const latest = sortedLogo[0];

      // Set the sorted logo and latest logo state
      setLogo(sortedLogo);
      setLatestLogo(latest);
    }
  }, [logo, setLogo]);

  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
              <title> বিশ্বস্ত-বাজার | Login</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center items-center">
          <Link to={"/"}>
            <img
              className="h-20 w-20 "
              src={latestLogo?.photo}
              alt=""
            />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Type your email"
              className="w-full p-2 border bg-white border-black rounded-lg"
              required
            />
          </div>
          <div className="relative">
          <span 
        className="absolute inset-y-0 mb-5 ml-5   right-2 top-3 flex items-center pr-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
      <input
        type={show ? "text" : "password"}
        name="password"
        placeholder="Enter your password"

        className="input w-full p-2 bg-white input-bordered border-black text-[#9F9F9F] text-xs font-normal mb-5 pr-10"

        required
      />
      
    </div>

    <div className="text-center text-sm text-gray-600">
            <Link to="/admin-login/reg-php" className="text-blue-600 hover:text-blue-500">
              Already have an account? Resister
            </Link>
          </div>


          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">Sign in</button>
        </form>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handleGoogleLogin} aria-label="Log in with Google" className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
            <FcGoogle />
          </button>
          <button onClick={handleFacebook} aria-label="Log in with Facebook" className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
            <FaSquareFacebook className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
