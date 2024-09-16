import useProducts from "../../Hook/useProducts";
import { useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products] = useProducts(); 
  const [activeTab, setActiveTab] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(30); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleTabClick = (category) => {
    setActiveTab(category);
    setCurrentPage(1); 
  };

  const filteredProducts = products
    .filter((product) => (activeTab ? product.category === activeTab : true))
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, 10);

  const navigate = useNavigate();

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
    <div className="my-5 mx-4 md:mx-10 lg:mx-28">
      <h1 className="text-3xl md:text-4xl font-bold text-black text-center my-5">Our Products</h1>

      {/* Tabs for sorting */}
      <div className="mb-4 flex justify-center items-center">
        <div className="flex flex-wrap gap-3 md:gap-5 justify-center items-center">
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("")}
          >
            All Pack
          </button>
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "চুলের যত্ন" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("চুলের যত্ন")}
          >
            চুলের যত্ন
          </button>
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "ত্বকের যত্ন" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("ত্বকের যত্ন")}
          >
            ত্বকের যত্ন
          </button>
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "মাজুফল" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("মাজুফল")}
          >
            মাজুফল
          </button>
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "মুখের যত্ন" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("মুখের যত্ন")}
          >
            মুখের যত্ন
          </button>
          <button
            className={`mb-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-[#FF7701] focus:outline-none ${activeTab === "লিপবাম" ? 'bg-blue-500 text-white' : 'bg-white border border-gray-400 text-black'}`}
            onClick={() => handleTabClick("লিপবাম")}
          >
            লিপবাম
          </button>
        </div>
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center mt-12">
          <div>
            <h1 className="text-lg font-bold text-red-600">No product available</h1>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-1">
          {currentItems.map((item) => (
            <div className="rounded-lg border border-gray-200 p-3" key={item._id}>
              <div className="flex flex-col md:flex-row justify-start">
                {/* Image Section */}
                <img
                  className="w-full md:w-44 h-auto lg:rounded-l-lg md:rounded-l-lg md:rounded-none"
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.title}
                />
                
                {/* Content Section */}
                <div className="flex flex-col bg-orange-100 border border-gray-200 lg:rounded-r-lg md:rounded-r-lg shadow-md p-4 flex-grow">
                  {/* Title and Heart Icon */}
                  <div className="flex justify-between items-center mb-2">
                    <button className="text-lg font-bold text-gray-900">{item.title}</button>
                    <FaHeart
                      className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300"
                      onClick={() => handleFavourite(item._id, item.title, item.price, item.short, item.image)}
                    />
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-700 mt-2">
                    {item.short.split(" ").slice(0, 20).join(" ")}
                    {item.short.split(" ").length > 20 && "..."}
                  </p>

                  {/* Price and Cart Icon */}
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-300">
                    <p className="text-lg font-semibold text-orange-600">{item.price}৳</p>
                    <button
                      onClick={() => handleCart(item._id, item.title, item.price, item.short, item.image)}
                      className="text-gray-700 hover:text-orange-600 transition-colors duration-300"
                    >
                      <FaCartArrowDown size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
