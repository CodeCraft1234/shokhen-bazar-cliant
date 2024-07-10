
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaCartPlus, FaHeart } from "react-icons/fa";

import { useState } from "react";

const ProductCard = ({ item, index }) => {
  console.log(item);
  const {
    image,
    discount,
    price,
    oldprice,
    short,
    category,
    title,
    _id,
    id,
    originalPrice,
  } = item;
  console.log(item);
  const [expandedCards, setExpandedCards] = useState(
    Array(item.length).fill(false)
  );

  const toggleCardVisibility = () => {
    const updatedExpandedCards = [...expandedCards];
    updatedExpandedCards[index] = !expandedCards[index];
    setExpandedCards(updatedExpandedCards);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle adding a product to cart
  const handleCart = (id, title, price, short, image) => {
    const cartItem = { id, title, price, short, image };
    let cart = localStorage.getItem("cart");

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
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate(location?.state ? location.state : "/myCart");
  };

  const handleFavourite = (id, title, price, short, image) => {
    const cartItem = { id, title, price, short, image };
    let cart = localStorage.getItem("favourite");

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
    localStorage.setItem("favourite", JSON.stringify(cart));
    navigate(location?.state ? location.state : "/myFavourite");
  };

  return (
    <div className="group p-0  md:p-0 lg:p-0">
  <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col justify-between lg:h-full relative">
    <Link to={`/productDetails/${_id || id}`} key={_id} className="flex flex-col h-full">
      <img
        className="w-full h-28 lg:h-48 md:h-44 transform transition-transform duration-500 hover:scale-110"
        src={image}
        alt=''
      />
      {discount > 0 && (
        <div className="rounded absolute ">
          <button className="bg-red-500 text-white text-xs font-bold px-2 py-1">
            {discount}%
          </button>
        </div>
      )}

      <div className="p-2 flex-grow flex flex-col">
        <h2 className=" text-base hover:text-blue-700 text-black hover:font-bold lg:text-lg">{title}</h2>
        <p className="text-red-300 text-base lg:text-lg flex justify-between font-medium">
          <span className="text-red-600 hover:text-blue-600 ">৳  {price}</span>{" "}
          {discount > 0 && (
            <span className="line-through text-gray-500">৳ 
              {parseFloat(price) + (price * discount) / 100}
            </span>
          )}
        </p>
      </div>
      </Link>
      {/* hover effect */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
       
        <Link to={`/productDetails/${_id || id}`}>
        <button  className="bg-white rounded-full p-2 shadow-lg">
          <FaEye className="text-gray-800" />
        </button>
        </Link>
        <button onClick={() => handleCart(_id, title, price, short, image)} className="bg-white rounded-full p-2 shadow-lg">
          <FaCartPlus className="text-gray-800" />
        </button>
        <button onClick={() => handleFavourite(_id, title, price, short, image)} className="bg-white rounded-full p-2 shadow-lg">
          <FaHeart className="text-gray-800" />
        </button>
      </div>
    

    <div>
      <button
        onClick={() => handleCart(_id, title, price, short, image)}
        className="bg-blue-500 hover:bg-blue-900 text-base lg:text-lg text-white py-2 rounded-b w-full"
      >
        অর্ডার করুন
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductCard;