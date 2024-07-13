import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Axios/useAxiosPublic';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles 

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const image_hosting_key = "6fbc3358bbb1a92b78e2dee0f5ca1b94";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const AxiosPublic = useAxiosPublic();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [short, setDescription] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await AxiosPublic.post(image_hosting_api, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.data.display_url;
  };

  const onSubmit = async (data) => {
    try {
      const image = await uploadImage(data.image[0]);

      const subImages = [];
      if (data.image1.length > 0) {
        const subImage1 = await uploadImage(data.image1[0]);
        subImages.push(subImage1);
      }
      if (data.image2.length > 0) {
        const subImage2 = await uploadImage(data.image2[0]);
        subImages.push(subImage2);
      }
      if (data.image3.length > 0) {
        const subImage3 = await uploadImage(data.image3[0]);
        subImages.push(subImage3);
      }

      const { title, price, category, brand, discount } = data;
      const cleanDescription = stripHtmlTags(short);
      const body = {
        title,
        currentTime,
        image,
        subImages,
        short: cleanDescription,
        price,
        category,
        brand,
        discount
      };

      await AxiosPublic.post('/products', body);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error uploading images or saving product:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to save product',
        showConfirmButton: true,
      });
    }
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="px-4 py-3">
      <Helmet>
        <title>Shokher Bazar | AddProduct</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Add Product</h2>

      <form className="rounded-lg space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="Enter product title"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Main Image</label>
            <input
              {...register('image', { required: true })}
              type="file"
              className="mt-1 file-input file-input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
            {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
          </div>
        </div>

        <div className="flex justify-around items-center gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Image 1</label>
            <input
              {...register('image1')}
              type="file"
              className="mt-1 file-input file-input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Image 2</label>
            <input
              {...register('image2')}
              type="file"
              className="mt-1 file-input file-input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Image 3</label>
            <input
              {...register('image3')}
              type="file"
              className="mt-1 file-input file-input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              {...register('price', { required: true })}
              type="number"
              step="0.01"
              placeholder="Enter product price"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
            {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount % <span className='text-red-400'>(Optional)</span></label>
            <input
              {...register('discount')}
              type="number"
              step="0.01"
              placeholder="Enter discount percentage"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              {...register('brand', { required: true })}
              type="text"
              placeholder="Enter product brand"
              className="mt-1 input input-bordered w-full bg-white border-black text-base font-medium text-gray-700"
            />
            {errors.brand && <span className="text-red-500 text-sm">Brand is required</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: true })}
            className="mt-1 select select-bordered w-full bg-white border-black text-base font-medium text-gray-700"
          >
            <option disabled value="allPack">All Pack</option>
            <option value="চুলের যত্ন">চুলের যত্ন</option>
            <option value="ত্বকের যত্ন">ত্বকের যত্ন</option>
            <option value="মাজুফল">মাজুফল</option>
            <option value="মুখের যত্ন">মুখের যত্ন</option>
            <option value="লিপবাম">লিপবাম</option>
           
          </select>
          {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
        </div>

        <div className='p-3 pb-5 rounded-lg bg-white'>
          <label className="block text-base font-medium ml-4 text-gray-700">Description</label>
          <ReactQuill
            value={short}
            onChange={setDescription}
            className="mt-1 p-4 py-10 h-[400px] bg-white"
            theme="snow"
            required
          />
        </div>

        <div>
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white px-4 py-2 mb-10 rounded w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
