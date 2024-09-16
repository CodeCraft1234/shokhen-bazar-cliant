import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Axios/useAxiosPublic';


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('my_orders')) || [];
        setOrders(storedOrders);
    }, []);
    const AxiosPublic=useAxiosPublic()

    const handleCancelOrder = (orderId) => {
        // Filter out the order with the given orderId
        const updatedOrders = orders.filter(order => order.orderId !== orderId);

        // Update the state and local storage with the updated orders
        setOrders(updatedOrders);
        localStorage.setItem('my_orders', JSON.stringify(updatedOrders));
        AxiosPublic.delete(`/orders/${orderId}`)
    };

    return (
        <div className=" pt-16 mx-auto py-2 mt-4 px-4 md:px-8">
            <Helmet>
                <title>Shokher Bazar| My Orders</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            {
                orders.length === 0 ? (
                    <div className="bg-white flex  justify-center items-center p-6 min-h-screen rounded-lg text-center">
                        <div>
                            <h1 className="text-2xl font-bold mb-5 text-black">কোন প্রোডাক্ট নেই</h1>
                            <Link to="/">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm">
                                    অন্যান্য পণ্য দেখতে ক্লিক করুন
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-3 mt-12 text-center text-black">My Orders</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <div key={order._id} className="border bg-green-200 rounded-lg p-6 ">
                                    <h2 className="text-md font-bold mb-4 text-black">Order ID: {order._id}</h2>
                                    <p className="text-sm text-black"><strong>Name:</strong> {order.name}</p>
                                    <p className="text-sm text-black"><strong>Phone:</strong> {order.phone}</p>
                                    <p className="text-sm text-black"><strong>Address:</strong> {order.address}</p>
                                    <p className="text-sm text-black"><strong>Order Date:</strong> {order.date}</p>
                                    <h3 className="text-md font-bold mt-6 mb-4 text-black">Cart Items</h3>
                                    <div className="grid gap-4">
                                        {order.cartItems.map(item => (
                                            <div key={item.id} className="flex items-center border border-gray-300 p-2 rounded-md bg-white">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 mr-4 rounded-md" />
                                                <div className="text-black">
                                                    <p className="text-sm font-bold">{item.title}</p>
                                                    <p className="text-sm">Price: {item.price} টাকা</p>
                                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-black font-bold text-sm"><strong>Delivery Charge:</strong> {order.deliveryCharge} টাকা</p>
                                    <p className="text-black font-bold text-sm"><strong>Subtotal:</strong> {order.subTotal} টাকা</p>
                                    <p className="text-md font-bold mt-6 text-black">Total Amount: {order.totalAmount} টাকা</p>
                                    <button onClick={() => handleCancelOrder(order.orderId)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-md text-sm">Cancel Order</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyOrders;