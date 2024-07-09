


import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async"; 



const ForgetPassword = () => {
    const { forgetPass } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleForgetPassword = (e) => {
        // access the form data
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
    
        forgetPass(email)
            .then(() => {
                // console.log(res);
                // if (res.data.success) {
                //     // navigate after login
                navigate(location?.state ? location.state : "/");
                    return toast.success("Password Reset Mail Sent");
                
            })
            .catch((error) => {
                console.log(error);
                return toast.error("There is no user record corresponding to this identifier. The user may have been deleted.");
            });
    
        }

return (
    <div>
        <div className="hero min-h-screen mt-36 ">
        <Helmet>
              <title> বিশ্বস্ত-বাজার | ForgetPassword</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse ">
                <div className="text-center lg:text-left"></div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleForgetPassword} className="card-body">
                        <div className="form-control">





                            <label className="label">
                                <span className="label-text text-[#403F3F] text-sm font-semibold">
                                    Email address
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                name="email"
                                className="input input-bordered text-[#9F9F9F] text-xs font-normal "
                                required
                            />
                        </div>
                        <div className="form-control mt-4">
                            <button className="p-2 rounded bg-blue-700 text-white">
                                Submit
                            </button>
                        </div>





                    </form>
                </div>
            </div>
        </div>
    </div>
)
};



export default ForgetPassword;
