import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import UseAxiosPublic from "../src/Axios/useAxiosPublic";
import { useForm } from "react-hook-form";
import useLogo from "../src/Hook/useLogo";
import { Helmet } from "react-helmet-async"; 

const image_hosting_key = "6fbc3358bbb1a92b78e2dee0f5ca1b94";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateProfiles } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const AxiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.image);
    const image = { image: data.image[0] };
    const res = await AxiosPublic.post(image_hosting_api, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photo = res.data.data.display_url;
    console.log(res.data.data.display_url);
    console.log(name, email, password, photo);

    createUser(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
        updateProfiles(name, photo);
        console.log(result.user);
        console.log(email, name, photo);
        const date = new Date();
        const userInfo = { email, name, photo, date, role: "user" };
        console.log(date);

        AxiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        navigate(location?.state ? location.state : "/dashboard/admin/adminHome");
        return toast.success("User created successfully");
      })
      .catch((error) => {
        console.log(error);
        return toast.error("User already exists");
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

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
              <title> বিশ্বস্ত-বাজার | Register</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center items-center">
          <Link to={"/"}>
            <img
              className="h-20 w-20 "
              src={latestLogo?.photo}
              alt=""
            />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center  text-black">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="type your name..."
              className="mt-1 block w-full p-2 border border-black bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              {...register("image")}
              type="file"
              id="image"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
               placeholder="type your email..."
              className="mt-1 block w-full bg-white p-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", { required: true, maxLength: 20, minLength: 6 })}
              type="password"
              id="password"
               placeholder="type your password..."
              className="mt-1 block w-full bg-white  p-2 border border-black rounded-md"
              required
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password must be 6-20 characters long
              </span>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 p-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Accept Terms & Conditions
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <Link to="/admin/login-php" className="text-blue-600 hover:text-blue-500">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
