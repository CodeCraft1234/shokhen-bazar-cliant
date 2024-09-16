import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../Hook/useProducts';
import { FaCartPlus, FaEye, FaHeart } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {title}=useParams()
  const query = searchParams.get('query');
  const [products] = useProducts();

  console.log('Products:', products); // Add this line to check the products data

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));


  const navigate = useNavigate();

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
    <div className=" py-16 md:pt-32 pt-32 lg:px-8 px-4">
      <h1 className="lg:text-xl ml-4 text-black font-bold mb-6">Search Results for {title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="">
              <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col justify-between lg:h-full relative">
    <Link to={`/productDetails/${product._id || product.id}`} key={product._id} className="flex flex-col h-full">
      <img
        className="w-full h-28 lg:h-48 md:h-44 transform transition-transform duration-500 hover:scale-110"
        src={product.image}
        alt=''
      />
      {product.discount > 0 && (
        <div className="rounded absolute ">
          <button className="bg-red-500 text-white text-xs font-bold px-2 py-1">
            {product.discount}%
          </button>
        </div>
      )}

      <div className="p-2 flex-grow flex flex-col">
        <h2 className=" text-base hover:text-blue-700 text-black hover:font-bold lg:text-lg">{product.title}</h2>
        <p className="text-red-300 text-base lg:text-lg flex justify-between font-medium">
          <span className="text-red-600 hover:text-blue-600 ">৳  {product.price}</span>{" "}
          {product.discount > 0 && (
            <span className="line-through text-gray-500">৳ 
              {parseFloat(product.price) + (product.price * product.discount) / 100}
            </span>
          )}
        </p>
      </div>
      </Link>
      {/* hover effect */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
       
        <Link to={`/productDetails/${product._id || product.id}`}>
        <button  className="bg-white rounded-full p-2 shadow-lg">
          <FaEye className="text-gray-800" />
        </button>
        </Link>
        <button onClick={() => handleCart(product._id, product.title, product.price, product.short, product.image)} className="bg-white rounded-full p-2 shadow-lg">
          <FaCartPlus className="text-gray-800" />
        </button>
        <button onClick={() => handleFavourite(product._id, product.title, product.price, product.short, product.image)} className="bg-white rounded-full p-2 shadow-lg">
          <FaHeart className="text-gray-800" />
        </button>
      </div>
    

    <div>
      <button
        onClick={() => handleCart(product._id, product.title, product.price, product.short, product.image)}
        className="bg-[#FF7701] hover:bg-blue-900 text-base lg:text-lg text-white py-2 rounded-b w-full"
      >
        অর্ডার করুন
      </button>
    </div>
  </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
