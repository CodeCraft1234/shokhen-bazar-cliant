import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Axios/useAxiosPublic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const UpdateProducts = () => {
  const item = useLoaderData();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const image_hosting_key = "6fbc3358bbb1a92b78e2dee0f5ca1b94";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const AxiosPublic = useAxiosPublic();
  const [currentTime, setCurrentTime] = useState(new Date()); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    let imageUrl = item.image; // Use the existing image URL as the default
  
    // Check if a new image is uploaded
    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      try {
        const res = await AxiosPublic.post(image_hosting_api, formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        imageUrl = res.data.data.display_url; // Use the new uploaded image URL
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Image upload failed. Please try again.",
          icon: "error",
        });
        return;
      }
    }
  
    const { title, short, price, category, brand, discount } = data;
    const body = {
      title,
      currentTime: new Date(), // Ensure currentTime is set
      image: imageUrl, // Use the determined image URL
      short,
      price,
      category,
      brand,
      discount: discount || 0, // Set discount to 0 if not provided
    };
  
    // Log the body to verify the data
    console.log("Request body:", body);
  
    try {
      await AxiosPublic.patch(`/products/${item._id}`, body);
      Swal.fire({
        title: "Updated!",
        text: "This product has been updated.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Product update failed. Please try again.",
        icon: "error",
      });
    }
  };
  

  return (
    <div className="  px-4 ">
      <Helmet>
              <title> বিশ্বস্ত-বাজার | UpdateProducts</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
      <div className="text-center ">
        <h2 className="text-xl font-bold py-5 text-pink-600">Update {item.title}</h2>
      </div>

      <form className="bg-white shadow-lg rounded-lg p-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              defaultValue={item.title}
              placeholder="Enter product title"
              className="mt-1 input input-bordered bg-white border-black w-full text-base font-medium text-gray-700"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              {...register("image")}
              type="file"
              className="mt-1 file-input file-input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              {...register("price")}
              type="number"
           
              defaultValue={item.price}
              placeholder="Enter product price"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount <span className='text-red-400'>(Optional)</span></label>
            <input
              {...register("discount")}
              type="number"
             
              defaultValue={item.discount}
              placeholder="Enter discount percentage"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              {...register("brand" )}
              type="text"
              defaultValue={item.brand}
              placeholder="Enter product brand"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
           
          </div>


        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category")}
            defaultValue={item.category}
            className="mt-1 select select-bordered w-full bg-white border-black text-base font-medium text-gray-700"
          >
            <option value="allPack">All Pack</option>
            <option value="চুলের যত্ন">চুলের যত্ন</option>
            <option value="ত্বকের যত্ন">ত্বকের যত্ন</option>
            <option value="মাজুফল">মাজুফল</option>
            <option value="মুখের যত্ন">মুখের যত্ন</option>
            <option value="লিপবাম">লিপবাম</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            {...register("short")}
            type="text"
            defaultValue={item.short}
            placeholder="Enter a short description"
            className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProducts;
