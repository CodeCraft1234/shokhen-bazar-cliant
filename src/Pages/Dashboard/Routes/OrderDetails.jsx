

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useOrders from "../../../Hook/useOrders";
import useNumbers from "../../../Hook/useNumbers";
import { FaPhoneAlt } from "react-icons/fa";
import useAddress from "../../../Hook/useAddress";
import { Helmet } from "react-helmet-async"; 

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orders] = useOrders();
  const order = orders.find((order) => order._id === orderId);

  const [links, setLinks] = useNumbers();
  const [latestLinks, setLatestLinks] = useState(null);
  console.log(latestLinks, links);

  const [address, setAddress] = useAddress();
  const [latestAddress, setLatestAddress] = useState(null);
  console.log(latestAddress, address);

  useEffect(() => {
    if (links && links.length > 0) {
      // Sort the links based on date in descending order
      const sortedLinks = [...links].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Get the latest link
      const latest = sortedLinks[0];

      // Set the sorted links and latest link state
      setLinks(sortedLinks);
      setLatestLinks(latest);
    }
  }, [links, setLinks]);

  useEffect(() => {
    if (address && address.length > 0) {
      // Sort the links based on date in descending order
      const sortedAddress = [...address].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Get the latest link
      const latestAddress = sortedAddress[0];

      // Set the sorted links and latest link state
      setLinks(sortedAddress);
      setLatestAddress(latestAddress);
    }
  }, [address, setAddress, setLinks]);

  if (!order) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-8">
        <Helmet>
              <title> বিশ্বস্ত-বাজার | OrderDetails</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
        <div className="bg-white flex justify-center items-center p-6 min-h-screen rounded-lg text-center">
          <div>
            <h1 className="text-lg md:text-3xl font-bold mb-5 text-black">
              Order not found
            </h1>
            <Link to="/">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm md:text-base">
                Click here to view other products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
        <Helmet>
              <title> PerfectArch | OrderDetails</title>
              <link rel="canonical" href="https://www.tacobell.com/" />
               </Helmet>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-4 mt-10">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-black">INVOICE</h2>
            <p className="text-sm md:text-base text-gray-700">
              Date: {order.date}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Invoice ID: {order._id}
            </p>
          </div>
          <div className="mb-4 mt-6">
            <h3 className="text-base md:text-lg font-bold text-black">
              Invoiced To:
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Name:</strong> {order.name}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Phone:</strong> {order.phone}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Address:</strong> {order.address}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto text-center mb-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-red-600 text-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Unit Cost</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">{item.price} Tk</td>
                  <td className="py-2 px-4">{item.price * item.quantity} Tk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-2">
              <span className="text-sm md:text-base text-gray-700">
                Subtotal
              </span>
              <span className="text-sm md:text-base text-gray-700">
                {order.cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}{" "}
                Tk
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm md:text-base text-gray-700">
                Delivery Chrg.
              </span>
              <span className="text-sm md:text-base text-gray-700">
                {order.totalAmount - order.subTotal}
              </span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-300">
              <span className="text-lg md:text-xl font-bold text-black">
                Total
              </span>
              <span className="text-lg md:text-xl font-bold text-black">
                {order.totalAmount} Tk
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Important: This is an electronic generated invoice so doesn't
            require any signature.
          </p>
          <p className="text-sm text-gray-600">
            Please read all terms and policies on www.yourdomain.com for
            returns, replacement and other issues.
          </p>
        </div>
        <div className="mt-4 text-right">
          <h1 className="text-lg md:text-3xl font-bold text-black">
            {latestAddress?.webID}
          </h1>
          <p className="text-sm md:text-base text-gray-700">
            {latestAddress?.facebookIDD}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            contact@perfect.arch
          </p>
          <h1 className="text-base flex justify-start items-center md:text-base lg:text-base text-green-600 -mx-2">
            <span className="text-base md:text-base lg:text-base font-bold ml-auto"></span>
            +88{latestLinks?.facebookID}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
