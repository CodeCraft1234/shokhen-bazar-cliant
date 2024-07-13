import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useProducts from "../../Hook/useProducts";
import useFeedbacks from "../../Hook/useFeedbacks";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Swal from "sweetalert2";

import { FaRegUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
const ProductDetails = () => {

    const ProductDetails=useLoaderData()
    const { image,discount,subImages, price,brand, short, category, title, _id } = ProductDetails;
    console.log(ProductDetails,subImages)

const [products] = useProducts();
const [related, setRelated] = useState([]);
console.log(related);

useEffect(() => {
  const filtered = products
    .filter(product => product.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Assuming 'date' is the field representing the creation or updated date
    .slice(0, 10); // Get the latest 10 products
  setRelated(filtered);
}, [products, category]);

    //////////////////////////////////////////////////////////////////////////

    const [feedbacks, refetch] = useFeedbacks(); // Assuming useFeedbacks() is a custom hook to fetch feedbacks
    const [feed, setFeed] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
  
    // Simulated feedbacks data
    useEffect(() => {
      // Filter feedbacks based on ProductDetails._id
      const filteredFeed = feedbacks.filter(feedback => feedback.id === ProductDetails._id);
      setFeed(filteredFeed);
    }, [feedbacks, ProductDetails._id]);
  



  /////////////////////////////////////

 

  // Simulated feedbacks data
  useEffect(() => {
    // Filter feedbacks based on ProductDetails._id
    const filteredFeed = feedbacks.filter(feedback => feedback.id === ProductDetails._id);
    setFeed(filteredFeed);
  }, [feedbacks, ProductDetails._id]);

  // Calculate average rating dynamically
  const calculateAverageRating = () => {
    if (feed.length === 0) return 0;

    const totalRatings = feed.reduce((acc, curr) => acc + curr.rating, 0);
    return (totalRatings / feed.length).toFixed(1);
  };

  // Calculate rating distribution dynamically
  const calculateRatingDistribution = () => {
    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    feed.forEach((feedback) => {
      distribution[feedback.rating]++;
    });

    // Calculate percentages
    const totalCount = feed.length;
    for (let key in distribution) {
      distribution[key] = ((distribution[key] / totalCount) * 100).toFixed(2);
    }

    return distribution;
  };


  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    // Logic to handle rating click, you can update API or state here
  };

  /////////////////////////////////////////

  const handleSubmitted = (e) => {
    e.preventDefault();
    const textareaValue = e.target.textarea.value;

    // Get current date (without time)
    const submissionDate = new Date().toISOString().split("T")[0];

    const body = {
      id:_id,
      textarea: textareaValue,
      rating: selectedRating,
      submissionDate, // Just the date without time
    };
    console.log(body)
    fetch("http://localhost:5000/feedbacks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch()
        navigate(location.state ? location.state : `/productDetails/${ProductDetails._id}`);
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            title: "Success",
            text: "Feedback sent successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          // Clear textarea after successful submission
          e.target.textarea.value = "";
          setSelectedRating(0);
        }
      });
  };

const navigate = useNavigate();
  const location = useLocation();

  // Function to handle adding a product to cart
  const [selectedImage, setSelectedImage] = useState(image);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
 
  useEffect(() => {
    if (feedbacks && feed.length > 0) {
      const totalRatings = feed.length;
      const averageRating = feed.reduce((acc, feedback) => acc + feedback.rating, 0) / totalRatings;

      setTotalRatings(totalRatings);
      setAverageRating(averageRating);
    }
  }, [feed]);

  const ratings = [1, 2, 3, 4, 5].map(stars => ({
    stars,
    count: feed.filter(feedback => feedback.rating === stars).length
  }));



  // Function to handle adding a product to cart
  const handleCart = (id, title, price, short, image) => {
    const cartItem = { id, title, price, short, image };
    let cart = localStorage.getItem("shokhercart");

    if (!cart) {
      cart = [];
    } else {
      try {
        cart = JSON.parse(cart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        cart = [];
      }
    }

    if (!Array.isArray(cart)) {
      cart = [];
    }

    cart.push(cartItem);
    localStorage.setItem("shokhercart", JSON.stringify(cart));
    navigate(location?.state ? location.state : "/myCart");
  };

  const handleFavourite = (id, title, price, short, image) => {
    const cartItem = { id, title, price, short, image };
    let cart = localStorage.getItem("shokherfavourite");

    if (!cart) {
      cart = [];
    } else {
      try {
        cart = JSON.parse(cart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        cart = [];
      }
    }

    if (!Array.isArray(cart)) {
      cart = [];
    }

    cart.push(cartItem);
    localStorage.setItem("shokherfavourite", JSON.stringify(cart));
    navigate(location?.state ? location.state : "/myFavourite");
  };

    return (
            <div className="pt-20 px-4 text-black">
              <Helmet>
              <title> বিশ্বস্ত-বাজার | ProductDetails</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
                <div className=" mt-7 lg:mt-12 md:mt-12  gap-3">
              <div  className="   overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-7 ">
  {/* Left side with thumbnails */}
 {
  subImages.length === 0 ? <></> :  <div className="grid grid-cols-4 md:grid-cols-4 order-2 lg:order-1 md:order-2 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-1 ">
  {subImages?.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Thumbnail ${index + 1}`}
      className="cursor-pointer lg:h-28 h-24 md:h-36 md:mx-auto md:w-44 w-full rounded-lg sm:w-48 border-2 border-gray-300 hover:border-blue-500"
      onClick={() => setSelectedImage(image)}
    />
  ))}
</div>
 }
  {/* Right side with selected image */}
  <div className="lg:col-span-3 order-1 lg:order-2 md:order-1 sm:col-span-2 items-center">
    <img src={selectedImage} alt="Selected" className="w-full h-72 rounded-lg md:h-[450px] lg:h-[500px] border-2 bg-gray-500 border-gray-300" />
  </div>

   <div className="lg:col-span-3 order-3 lg:order-3 md:order-3 sm:col-span-2">
      <div className="p-4">
        <h2 className="font-bold text-blue-700 text-lg mb-2">{title}</h2>
        <div className="mb-2">
     
        </div>
       
       <p><span className="font-bold text-xl text-red-600">Description</span></p>
       <p className="text-justify mb-4 bg-white" dangerouslySetInnerHTML={{ __html: short }}></p>
      
        <div className="flex py-5 justify-start gap-5">
          <h1>Brand: <span className="text-blue-500 font-bold">{brand}</span></h1>
          <h1>Sold by: <span className="text-blue-500 font-bold">{brand} Official</span></h1>
        </div>
        <div className="flex border-t border-b border-gray-400 py-5 justify-start gap-9 items-center">
          <p className="font-bold text-3xl text-red-500">৳ {price}</p>
          <p className="line-through text-2xl text-gray-500">৳ {parseFloat(price) + (price * discount / 100)}</p>
          {discount > 0 && (
            <div className="p-1 bg-red-500 text-white rounded-lg">
              New
            </div>
          )}
        </div>
        <div className="flex py-5 justify-start gap-9">
          <button
            onClick={() => handleCart(_id, title, price, short, image)}
            className="bg-[#FF7701] text-white font-bold py-2 px-4 rounded-md shadow-md w-1/2"
          >
            <span className="mr-2">&#128722;</span> অর্ডার করুন
          </button>
          <button onClick={() => handleCart(_id, title, price, short, image)} className="bg-[#FF7701] text-white font-bold py-2 px-4 rounded-md shadow-md w-1/2">
            Buy now
          </button>
        </div>
        <div className="py-3">
        
        </div>
        
        <div className="text-left">
          <p className="text-green-500 font-bold">অগ্রিম মূল্য পরিশোধে ৫% ডিসকাউন্ট</p>
          <p className="text-blue-500">ঢাকায় সিটির ডেলিভারি খরচ (১-২ দিন) - 60TK</p>
          <p className="text-blue-500">ঢাকার বাইরে থেকে হলে ডেলিভারি খরচ (২-৪ দিন) - 100TK</p>
        </div>
      </div>
    </div>
</div>



            </div>
            <div>
            <div className="rounded-lg px-10   bg-white sm:order-2 md:order-2 md:col-span-2 lg:order-2 lg:col-span-2">
               
                

                    <div className="">

<div className="grid lg:grid-cols-4 gap-10 my-3 justify-between   items-center">

<div className=" lg:col-span-3 w-full lg:p-4  ">
      <div className="flex items-center mb-2">
        <div className="text-3xl font-semibold text-gray-800">{averageRating.toFixed(1)}</div>
        <div className="ml-2 px-2 py-1 text-lg font-medium text-yellow-500 bg-yellow-100 rounded">
          {averageRating >= 4 ? 'Excellent' : averageRating >= 3 ? 'Good' : 'Average'}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.372 1.24.588 1.81l-3.382 2.455a1 1 0 00-.363 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.383-2.455a1 1 0 00-1.176 0L5.79 18.058c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.363-1.118L1.791 9.397c-.784-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
        <div className="ml-2 text-gray-600">{totalRatings} ratings</div>
      </div>
      <div>
  {ratings
    .sort((a, b) => b.stars - a.stars) // Sort ratings in descending order
    .map((rating) => (
      <div key={rating.stars} className="flex items-center mb-1">
        <div className="flex items-center w-24">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating.stars ? 'text-yellow-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.372 1.24.588 1.81l-3.382 2.455a1 1 0 00-.363 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.383-2.455a1 1 0 00-1.176 0L5.79 18.058c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.363-1.118L1.791 9.397c-.784-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500"
            style={{ width: `${(rating.count / totalRatings) * 100}%` }}
          ></div>
        </div>
        <div className="ml-2 text-gray-600">{rating.count}</div>
      </div>
    ))}
</div>

    </div>

<div>
<button className=" bg-red-600 p-2 rounded-lg text-white font-bold" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Your Review</button>
             <dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-blue-200">
    <form method="dialog ">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle  absolute right-2 top-2">✕</button>
    </form>
    <div className="">
      <h2 className="text-center text-3xl font-bold">
        <span className="text-[#ff9f0d]">Pl</span>ease share your feedback
      </h2>

      <span className="flex justify-center py-4">How was your experience?</span>
      <div className="flex space-x-3 justify-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            title={`Rate ${rating} stars`}
            aria-label={`Rate ${rating} stars`}
            className={`${
              rating <= selectedRating ? "text-yellow-500" : "text-gray-400"
            } w-10 h-10`}
            onClick={() => handleRatingClick(rating)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmitted}>
          <div className="flex gap-6 mb-5">
          </div>
          <div>
            <textarea
              placeholder="Give Your Feedback"
              name="textarea"
              className="textarea bg-white textarea-bordered textarea-lg w-full max-w-md"
            ></textarea>
          </div>

          <div className="text-center mt-5">
            <button method="dialog"
              className="btn btn-outline bg-blue-700 hover:bg-red-600 text-white rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
            </dialog>
</div>
{/* //////////////////////////////////////////////////// */}






</div>

{/* //////////////////////////////////////////////////// */}          {
    feed.map(feedback => (
      <div className="my-5 border-b-2 pb-5 border-gray-300" key={feedback._id}>
      <div className="flex justify-start gap-1 items-center">
        <h1 className="text-base font-bold text-black">
          <FaRegUserCircle />
        </h1>
        <h1 className="text-base mr-10">User</h1>
        <div className="rating rating-sm">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${feedback._id}`}
              className={`opacity-0 absolute ${
                feedback.rating >= index + 1 ? 'checked' : ''
              }`}
              readOnly
            />
          ))}
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 fill-current ${
                  feedback.rating >= index + 1 ? 'text-yellow-500' : 'text-gray-400'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c-.3 0-.5.1-.7.3l-4.5 6.5-6.4.9c-.4.1-.7.5-.7.9 0 .4.3.8.6.9l5 3.9-1.5 6c-.1.3 0 .6.2.9.2.3.5.4.8.4.1 0 .2 0 .3-.1L12 18l5.2 3c.1 0 .2.1.3.1.3 0 .6-.1.8-.4.2-.3.3-.6.2-.9l-1.5-6 5-3.9c.3-.2.6-.5.6-.9s-.3-.8-.7-.9l-6.4-.9-4.5-6.5c-.2-.2-.4-.3-.7-.3z"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <h1 className="text-base text-red-400 font-bold">{feedback.textarea}</h1>
    </div>
    ))
}

                    </div>
            </div>
            </div>
                </div>

        <div className="mx-4 py-3">
            <h1 className="text-xl font-bold ">Related Products</h1>

            {
                related.map(item=>{
                    <div  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
               
                    <div className="relative group">
                    <Link to={`/productDetails/${item._id || item.id}`}>
                       <img className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110" src={item.image} alt={item.title} />
                    </Link>
                                
                                <button onClick={() => handleFavourite(item._id, item.title, item.price, item.short, item.image)} className="absolute top-2 right-2 bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300">
                                    <i className="fas fa-heart"></i>
                                </button>
                            </div>
                
                            <div className="p-4">
                              <Link to={`/productDetails/${item._id || item.id}`}>
                              <h3 className="text-xl font-semibold mb-2 hover:text-yellow-500 transition-all duration-300">{item.title}</h3>
                              </Link>
                               
                                <div className="flex justify-between items-center">
                                <Link to={`/productDetails/${item._id || item.id}`}>
                                <span className="text-yellow-500 font-bold">{item.price}</span>
                                </Link>
                                  
                                    <button onClick={() => handleCart(item._id, item.title, item.price, item.short, item.image)} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300 flex items-center">
                                        <i className="fas fa-shopping-cart mr-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                })
            }
        </div>
            </div>
    );
};

export default ProductDetails;