import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useProducts from "../../Hook/useProducts";
import useLogo from "../../Hook/useLogo";
import { AuthContext } from "../../../Security/AuthProvider";
import { LuListOrdered } from "react-icons/lu";
import useNumbers from "../../Hook/useNumbers";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOrdersDropdown = () =>
    setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeOrdersDropdown = () => setIsOrdersDropdownOpen(false);

  const handleLogOut = () => {
    logOut().then().catch();
    navigate("/");
  };

  const [products] = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [logo, setLogo] = useLogo();
  const [latestLogo, setLatestLogo] = useState(null);
  const [links, setLinks] = useNumbers();
  const [latestLinks, setLatestLinks] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (logo && logo.length > 0) {
      const sortedLogo = [...logo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latest = sortedLogo[0];
      setLogo(sortedLogo);
      setLatestLogo(latest);
    }
  }, [logo, setLogo]);

  useEffect(() => {
    if (links && links.length > 0) {
      const sortedLinks = [...links].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latest = sortedLinks[0];
      setLinks(sortedLinks);
      setLatestLinks(latest);
    }
  }, [links, setLinks]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery("");
    navigate(`/search/${searchQuery}`);
  };

  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <div
      className={`navbar bg-green-600 text-black rounded-md lg:pt-1 px-4 shadow-lg py-2 lg:px-10 md:px-8 fixed z-30 border-b ${
        user ? "top-8" : "top-0"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu rounded-lg menu-sm dropdown-content z-[1] p-2 shadow w-40"
            >
              <div className="bg-white text-black">
                <div className="text-black px-3 py-3 font-bold">
                  <h1>Call to Order Now</h1>
                  <h1 className="text-base flex justify-start items-center md:text-base lg:text-base text-red-800">
                    <span className="text-base md:text-base lg:text-base mr-2 font-bold">
                      <FaPhoneAlt />
                    </span>
                    +88{latestLinks?.facebookID}
                  </h1>
                </div>
                <ul className="menu menu-horizontal items-center px-1 flex gap-4">
                  <li>
                    <NavLink
                      className="text-base md:text-base lg:text-base font-bold"
                      to={"/myOrders"}
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-base md:text-base lg:text-base font-bold"
                      to={"/myCart"}
                    >
                      My Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myFavourite"
                      className="text-base md:text-base lg:text-base font-bold"
                      onClick={closeOrdersDropdown}
                    >
                      My Favourite
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="text-base md:text-base lg:text-base font-bold"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/beauty-product"
                      className="text-base md:text-base lg:text-base font-bold"
                    >
                      বিউটি প্রডাক্ট
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      className="text-base md:text-base lg:text-base font-bold"
                    >
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className="text-base md:text-base lg:text-base font-bold"
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </ul>
          )}
        </div>
        <div className="flex flex-grow sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <Link to="/">
            <img
              className="h-10 w-16 sm:h-16 sm:w-16 md:h-14 md:w-14 lg:h-16 lg:w-32 mt-2"
              src={latestLogo?.photo}
              alt="Logo"
            />
          </Link>
          <ul className="menu menu-horizontal px-1 hidden md:flex gap-4">
          <li>
            <NavLink to="/" className="text-base md:text-base lg:text-base font-bold">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/beauty-product" className="text-base md:text-base lg:text-base font-bold">
              বিউটি প্রডাক্ট
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className="text-base md:text-base lg:text-base font-bold">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="text-base md:text-base lg:text-base font-bold">
              Contact
            </NavLink>
          </li>
        </ul>
        </div>
      </div>
      <div className="navbar-center pt-3 mt-1 px-4 lg:px-12 flex justify-center relative">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <div className="flex items-center w-full lg:w-auto relative">
          <input
            type="text"
            id="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for..."
            className="w-full lg:w-[400px] rounded-md bg-white border-gray-200 p-2 shadow-sm sm:text-sm"
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <Link to={`search/${searchQuery}`}>
              <button
                onClick={handleSearch}
                type="submit"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </Link>
          </span>
        </div>
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-2 w-full lg:w-[400px] bg-white border border-gray-200 rounded-md shadow-lg">
            <ul className="max-h-60 overflow-auto">
              {suggestions.map((product) => (
                <li key={product.id} className="p-2 hover:bg-gray-100">
                  <Link
                    to={`search/${product.title}`}
                    onClick={() => setSearchQuery("")}
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-end text-black items-center hidden md:flex">
        <div className="text-white font-bold">
          <h1 className="block md:hidden">Call Now</h1>
          <h1 className="hidden md:block">Call to Order Now</h1>
          <h1 className="text-base flex justify-start items-center md:text-base lg:text-base text-white">
            <span className="text-base md:text-base lg:text-base mr-2 font-bold">
              <FaPhoneAlt />
            </span>
            +88{latestLinks?.facebookID}
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={toggleOrdersDropdown}
            className="text-lg mt-3 px-3 md:text-xl flex justify-center gap-1 items-center lg:text-xl py-2"
          >
            <span>
              <FaUserCircle />
            </span>
            <span className="">{isOrdersDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isOrdersDropdownOpen && (
            <div className="absolute bg-green-400 text-black shadow-md rounded-md mt-2 w-48">
              <ul className="py-2">
                <li>
                  <Link
                    to="/myOrders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeOrdersDropdown}
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myCart"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeOrdersDropdown}
                  >
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myFavourite"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeOrdersDropdown}
                  >
                    My Favourite
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link
          className="text-xl md:text-xl lg:text-2xl mr-2 font-bold"
          to={"/myCart"}
        >
          <button>
            <div className="badge badge-secondary">{cartItems.length}</div>
            <FaCartPlus />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
