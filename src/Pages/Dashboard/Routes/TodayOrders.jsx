import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useOrders from "../../../Hook/useOrders";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../../Axios/useAxiosPublic";
import toast from "react-hot-toast";

const TodayOrders = () => {
    const [orders,refetch] = useOrders();
    const [sortOption, setSortOption] = useState('');
    const [todayOrders, setTodayOrders] = useState([]); 

    const [activeDropdown, setActiveDropdown] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const filteredOrders = orders.filter(order => order.date.split('T')[0] === today);
        setTodayOrders(filteredOrders);
    }, [orders]);

    const handleCancelOrder = (orderId) => {
        // Logic to cancel the order
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedOrders = [...todayOrders].sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();

        if (sortOption === 'date-asc') {
            return timeA - timeB;
        } else if (sortOption === 'date-desc') {
            return timeB - timeA;
        }

        // Default to sorting by the latest time within today
        return timeB - timeA;
    });

const AxiosPublic=useAxiosPublic()
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await AxiosPublic.patch(`https://hirikbazar.vercel.app/orders/${orderId}`, { status: newStatus });
            console.log(response.data);
            refetch();
            toast.success('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    const openOrderDetails = (orderId) => {
        Navigate(`/order-details/${orderId}`);
    };

    const toggleDropdown = (orderId) => {
        if (activeDropdown === orderId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(orderId);
        }
    };
    return (
        <div className="py-3 pb-10 px-4">
            <Helmet>
                <title>বিশ্বস্ত-বাজার | All Orders</title>
            </Helmet>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 w-full sm:w-auto mt-6">
                <input
                    type="text"
                    placeholder="Search by product title"
                    className="w-full sm:w-auto mb-4 sm:mb-0 py-2 px-4 rounded-full border bg-gray-300 border-black text-black font-bold"
                />
                <div className="ml-0 sm:ml-auto">
                    <label htmlFor="sort" className="mr-2 text-black font-base">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="border border-gray-300 p-2 rounded text-base md:text-base"
                    >
                        <option value="">Select</option>
                        <option value="date-asc">Date (Oldest to Newest)</option>
                        <option value="date-desc">Date (Newest to Oldest)</option>
                    </select>
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Total Orders
            </h2>
            {orders.length === 0 ? (
                <div className=" flex justify-center items-center p-6 lg:min-h-[400px]  text-center">
                    <div>
                        <h1 className="text-base md:text-base font-base mb-5 text-black">No products available</h1>
                        <Link to="/">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 text-base md:text-base">
                                Click here to view other products
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto  z-30 ">
                    <table className="min-w-full text-center bg-gray-200 text-black">
                        <thead>
                            <tr className="text-black bg-green-300">
                                <th className="px-4 border border-gray-500 py-2">SL</th>
                                <th className="px-4 border border-gray-500 py-2">Customer Name</th>
                                <th className="px-4 border border-gray-500 py-2">Customer Mobile</th>
                                <th className="px-4 border border-gray-500 py-2">Ordered At</th>
                                <th className="px-4 border border-gray-500 py-2">Status</th>
                                <th className="px-4 border border-gray-500 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-4 border border-gray-500 py-2">{index + 1}</td>
                                    <td className="px-4 border border-gray-500 py-2">{order.name}</td>
                                    <td className="px-4 border border-gray-500 py-2">{order.phone}</td>
                                    <td className="px-4 border border-gray-500 py-2">{new Date(order.date).toLocaleString()}</td>
                                    <td className="px-4 border border-gray-500 py-2">
                                        <select
                                            className="border border-gray-300 p-1 rounded text-sm bg-gray-700 text-white"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Packaging">Packaging</option>
                                            <option value="Shipment">Shipment</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-4 border border-gray-500 py-2 relative">
                                        <button
                                            onClick={() => toggleDropdown(order._id)}
                                            className=" focus:outline-none"
                                        >
                                            &#8226;&#8226;&#8226;
                                        </button>
                                        {activeDropdown === order._id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                                <button
                                                    onClick={() => { openOrderDetails(order._id); toggleDropdown(order._id); }}
                                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => { handleCancelOrder(order._id); toggleDropdown(order._id); }}
                                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TodayOrders;
