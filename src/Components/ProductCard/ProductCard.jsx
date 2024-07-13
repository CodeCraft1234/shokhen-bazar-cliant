
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
    <div className="group p-0  md:p-0 lg:p-0">
 
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
               
                <div className="relative group">
                <Link to={`/productDetails/${_id || id}`}>
                   <img className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110" src={image} alt={title} />
                </Link>
                            
                            <button onClick={() => handleFavourite(_id, title, price, short, image)} className="absolute top-2 right-2 bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300">
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
            
                        <div className="p-4">
                          <Link to={`/productDetails/${_id || id}`}>
                          <h3 className="text-xl font-semibold mb-2 hover:text-yellow-500 transition-all duration-300">{title}</h3>
                          </Link>
                           
                            <div className="flex justify-between items-center">
                            <Link to={`/productDetails/${_id || id}`}>
                            <span className="text-yellow-500 font-bold">{price}</span>
                            </Link>
                              
                                <button onClick={() => handleCart(_id, title, price, short, image)} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300 flex items-center">
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
     
  
</div>

  );
};

export default ProductCard;