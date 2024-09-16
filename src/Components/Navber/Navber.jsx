import React, { useContext, useEffect, useState } from "react";
import { FaBox, FaCartPlus, FaHeart, FaPhoneAlt, FaTimes, FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useProducts from "e:/Web development/Office project ongoing/ShokhenBazar/Claint/src/Hook/useProducts";
import useLogo from "e:/Web development/Office project ongoing/ShokhenBazar/Claint/src/Hook/useLogo";
import { AuthContext } from "e:/Web development/Office project ongoing/ShokhenBazar/Claint/Security/AuthProvider";
import useNumbers from "e:/Web development/Office project ongoing/ShokhenBazar/Claint/src/Hook/useNumbers";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products] = useProducts();
  const [logo] = useLogo();
  const [latestLogo, setLatestLogo] = useState(null);
  const [links] = useNumbers();
  const [latestLinks, setLatestLinks] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  console.log(links);

  useEffect(() => {
    if (logo && logo.length > 0) {
      const sortedLogo = [...logo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latest = sortedLogo[0];
      setLatestLogo(latest);
    }
  }, [logo]);

  useEffect(() => {
    if (links && links.length > 0) {
      const sortedLinks = [...links].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latest = sortedLinks[0];
      setLatestLinks(latest);
    }
  }, [links]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const cartWithQuantity = parsedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(cartWithQuantity);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogOut = () => {
    logOut().then().catch();
    navigate("/");
  };

  return (
    <div className={`navbar bg-white text-black rounded-md shadow-lg fixed pr-4 lg:pr-28 px-4 lg:px-24 w-full z-30 border-b ${user ? "top-8" : "top-0"}`}>
      <div className="navbar-start flex items-center">
        {/* Hamburger Menu for Mobile */}
        <button
          className="btn btn-ghost lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />  
          ) : (
            <FaBars className="h-6 w-6" />  
          )}
        </button>
        {/* Sidebar/Dropdown for Mobile */}
        {isMenuOpen && (
          <div className="absolute top-12 left-0 w-full bg-white text-black shadow-lg rounded-md lg:hidden">
            <nav className="flex flex-col">
              {[
                { path: "/", label: "Home" },
                { path: "/myOrders", label: "Orders" },
                { path: "/myCart", label: "Cart" },
                { path: "/myFavourite", label: "Favourite" },
                { path: "/beauty-product", label: "Products" },
                { path: "/blog", label: "Blog" },
                { path: "/contact", label: "Contact" },
              ].map((link, index) => (
                <NavLink
                  key={index}
                  className="block px-4 py-2 hover:bg-gray-100"
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Logo */}
        <Link to="/">
          <img
            className="h-10 w-24 sm:w-16 md:h-14 md:w-14 lg:h-16 lg:w-24 mt-2"
            src={latestLogo?.photo}
            alt="Logo"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex justify-center items-center space-x-5">
        <NavLink to="/beauty-product" className="text-black hover:text-gray-700">
          Products
        </NavLink>
        <NavLink to="/blog" className="text-black hover:text-gray-700">
          Blog
        </NavLink>
        <NavLink to="/contact" className="text-black hover:text-gray-700">
          Contact
        </NavLink>
      </div>

      <div className="navbar-center flex-grow flex text-black justify-center items-center px-4 lg:px-12">
        <form className="relative w-full lg:w-[400px]" onSubmit={handleSearch}>
          <input
            type="text"
            id="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for..."
            className="w-full lg:w-[400px] rounded-md bg-white text-black border border-gray-600 p-2 shadow-sm"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-700"
            aria-label="Search"
          >
            <CiSearch className="h-5 w-5" />
          </button>
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-2 w-full lg:w-[400px] bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {suggestions.map((product) => (
                  <li key={product.id} className="p-2 hover:bg-gray-100">
                    <Link to={`search/${product.title}`} onClick={() => setSearchQuery("")}>
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      <div className="navbar-end hidden lg:flex items-center space-x-4 lg:space-x-3">
        {/* Call to Order for Mobile */}
        <div className="flex  md:hidden items-center text-red-800">
          <FaPhoneAlt className="mr-2" />
          +88{latestLinks?.facebookID}
        </div>

        {/* Call to Order for Desktop */}
        <div className="hidden md:flex flex-col items-center text-black">
          <h1 className="hidden md:block">Call to Order Now</h1>
          <div className="text-base flex items-center text-red-800">
            <FaPhoneAlt className="mr-2" />
            +88{latestLinks?.facebookID}
          </div>
        </div>

        <Link to="/myCart" className="relative text-xl text-black">
          <FaCartPlus />
        </Link>
        <Link to="/myOrders" className="block py-2 hover:bg-gray-100">
          <FaBox className="inline" />
        </Link>
        <Link to="/myFavourite" className="block py-2 hover:bg-gray-100">
          <FaHeart className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
