import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Importing the delete icon

import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Axios/useAxiosPublic";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const { product } = location.state || {};
  const [deliveryCharge, setDeliveryCharge] = useState(100);

  // Form input states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = localStorage.getItem("shokhercart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Initialize quantity for each item if not already present
      const cartWithQuantity = parsedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(cartWithQuantity);
    }
  }, []);

  const handleQuantityChange = (id, amount) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("shokhercart", JSON.stringify(updatedCartItems));
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("shokhercart", JSON.stringify(updatedCartItems));
  };

  const handleDeliveryChange = (charge) => {
    setDeliveryCharge(charge);
  };
  const AxiosPublic=useAxiosPublic()

  const navigate=useNavigate()

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderId = `DN${Math.floor(Math.random() * 1000) + 500}`;

    // Use the English date directly
    const englishDate = new Date()

    const orderData = {
        name,
        phone,
        address,
        cartItems,
        deliveryCharge,
        subTotal,
        totalAmount,
        orderId,
        status:"New",
        date: englishDate // Include the English date in the order data
    };

    // Post data to AxiosPublic
    AxiosPublic.post('/orders', orderData)
        .then(res => {
            console.log(res.data);

            // Clear local storage cart data after successful order
            localStorage.removeItem("cart");

            // Store the order data in local storage under the name "my_orders"
            let myOrders = JSON.parse(localStorage.getItem("my_orders")) || [];
            myOrders.push(orderData);
            localStorage.setItem("my_orders", JSON.stringify(myOrders));

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Your order has been successfully placed. Our staff will contact you soon.",
                showConfirmButton: false,
                timer: 4000
            });

            navigate("/order-success", {
                state: { orderId, totalAmount },
            });
        })
        .catch(err => {
            console.error("Error occurred while placing order:", err);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to place order. Please try again later.",
                showConfirmButton: true,
            });
        });
}


  
  

  const subTotal = cartItems.reduce(
    (total, item) =>
      total +
      parseInt(item.price.replace("৳", "").replace(",", "")) * item.quantity,
    0
  );
  const totalAmount = subTotal + deliveryCharge;

  
  return (
    <div className="  mx-8 ">
       <Helmet>
              <title> বিশ্বস্ত-বাজার | MyCart</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
      {
        cartItems.length === 0 ? <div className="bg-white flex justify-center items-center p-6 min-h-screen rounded-lg shadow-lg text-center">
     <div>
     <h1 className="text-3xl font-bold mb-5 text-black">  কোন প্রোডাক্ট নেই</h1>
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
            অন্যান্য পণ্য দেখতে ক্লিক করুন
          </button>
        </Link>
     </div>
      </div> : <div className=" flex justify-center items-center    text-center">

      <div className=" grid gap-5 md:grid-cols-2  mt-32">
        <div className="bg-gray-100 p-6 mx-4 rounded-lg ">
          <h2 className="text-lg text-black font-bold  mb-4">
            অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, দিয়ে{" "}
            <span className="text-red-600">অর্ডার কনফার্ম করুন </span>বাটনে ক্লিক
            করুন
          </h2>
          <form className="space-y-4 text-black " onSubmit={handleOrderSubmit}>
  <div>
    <label className="block text-left text-sm font-medium">আপনার নাম</label>
    <input
      type="text"
      placeholder="আপনার নাম"
      className="w-full p-2 border border-gray-300 rounded bg-white"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>
  <div>
  <label className="block text-sm text-left font-medium">
    আপনার মোবাইল নাম্বার
  </label>
  <input
    type="number"
    placeholder="আপনার মোবাইল নাম্বার"
    className="w-full p-2 border border-gray-300 rounded bg-white"
    value={phone}
    onChange={(e) => {
      const inputPhone = e.target.value;
      // Remove any non-numeric characters
      const numericPhone = inputPhone.replace(/\D/g, '');
      // Limit to 11 digits
      const limitedPhone = numericPhone.slice(0, 11);
      // Update state
      setPhone(limitedPhone);
    }}
    required
  />
</div>

  <div>
    <label className="block text-left text-sm font-medium">
      আপনার সম্পূর্ণ ঠিকানা
    </label>
    <input
      type="text"
      placeholder="আপনার সম্পূর্ণ ঠিকানা"
      className="w-full p-2 border border-gray-300 rounded bg-white"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      required
    />
  </div>
  <div className="space-y-4">
    <h3 className="text-sm text-black text-left font-medium mb-2">কুরিয়ার চার্জ</h3>
    <div className="flex flex-col md:flex-row md:space-x-4">
  <label className={`flex items-center ${deliveryCharge === 100 ? 'bg-green-300' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300 p-4 rounded-lg shadow-md cursor-pointer`}>
    <input
      type="radio"
      name="delivery"
      checked={deliveryCharge === 100}
      onChange={() => handleDeliveryChange(100)}
      className="mr-2 bg-black"
    />
    <span className="text-gray-700 font-semibold">
      ঢাকার বাইরে 100 টাকা
    </span>
  </label>
  <label className={`flex items-center ${deliveryCharge === 60 ? 'bg-green-300' : 'bg-white hover:bg-gray-200'} transition-colors duration-300 p-4 rounded-lg shadow-md cursor-pointer mt-4 md:mt-0`}>
    <input
      type="radio"
      name="delivery"
      checked={deliveryCharge === 60}
      onChange={() => handleDeliveryChange(60)}
      className="mr-2  bg-white"
    />
    <span className="text-gray-700 font-semibold">
      ঢাকার ভিতরে 60 টাকা
    </span>
  </label>
</div>

  </div>
  <button
    type="submit"
    className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-900"
  >
    অর্ডার কনফার্ম করুন
  </button>
</form>
        </div>

        <div className="bg-gray-100 p-6 ">
          <table className="w-full text-black mb-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">Product</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Total</th>
                <th className="border p-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart) => (
                <tr key={cart._id}>
                  <td className="border p-2">
                    <img
                      className="h-16 rounded-2xl w-16"
                      src={cart.image}
                      alt=""
                    />
                  </td>
                  <td className="border p-2">{cart.price}</td>
                  <td className="justify-center mt-5 p-2 flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(cart.id, -1)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{cart.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(cart.id, 1)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="border p-2">
                    {parseInt(cart.price.replace("৳", "").replace(",", "")) *
                      cart.quantity}{" "}
                    টাকা
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(cart.id)}
                      className="text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" text-black flex justify-between font-bold text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 rounded w-full">
            <h1>Sub-Total :</h1>
            <h1>{subTotal} টাকা</h1>
          </div>
          <div className=" border-b border-gray-400 text-black flex justify-between font-bold text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 rounded w-full">
            <h1>Delivery Charges :</h1>
            <h1>{deliveryCharge} টাকা</h1>
          </div>
          <div className=" text-black flex justify-between font-bold text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 rounded w-full">
            <h1>Total :</h1>
            <h1>{totalAmount} টাকা</h1>
          </div>
        </div>
      </div>
      </div>
      }
      
    </div>
  );
};

export default MyCart;