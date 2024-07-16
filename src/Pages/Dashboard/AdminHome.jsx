
import useOrders from "../../Hook/useOrders";
import useProducts from "../../Hook/useProducts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PieChartComponent from "./PieChartComponent.JSX";
import BarChartComponent from "./BarchartComponent";
import { Helmet } from "react-helmet-async"; 

const AdminHome = () => {
  const [orders] = useOrders(); // Assuming useOrders returns an array of orders
  const [products] = useProducts(); // Assuming useProducts returns an array of products

  // Step 1: Extract phone numbers from orders
  const phoneNumbers = orders.map((order) => order.phone);

  // Step 2: Remove duplicates using Set
  const uniquePhoneNumbers = new Set(phoneNumbers);

  // Step 3: Count the total number of unique phone numbers
  const totalUniquePhoneNumbers = uniquePhoneNumbers.size;

  console.log("Total unique phone numbers:", totalUniquePhoneNumbers);

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [todayTotalSales, setTodayTotalSales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const navigate = useNavigate();

  const handleOrderClick = (title) => {
      navigate(`/dashboard/admin/orders/${title}`);
  }

  useEffect(() => {
    // Function to calculate today's total sales
    const calculateTodayTotalSales = () => {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Filter orders for today and sum their totalAmount
      const todaySales = orders
        .filter((order) => {
          const orderDate = new Date(order.date);
          return (
            orderDate >= startOfToday &&
            orderDate < new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)
          );
        })
        .reduce((acc, order) => acc + order.totalAmount, 0);

      // Update state with today's total sales
      setTodayTotalSales(todaySales);
    };

    // Function to calculate total sales
    const calculateTotalSales = () => {
      // Sum totalAmount for all orders
      const total = orders.reduce((acc, order) => acc + order.totalAmount, 0);

      // Update state with total sales
      setTotalSales(total);
    };

    // Call the functions to calculate today's and total sales
    calculateTodayTotalSales();
    calculateTotalSales();
  }, [orders]); // Execute when orders change

  //////////////////////////////////////
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);
  const [todayOrderQuantity, setTodayOrderQuantity] = useState(0);

  useEffect(() => {
    // Function to calculate total order quantity
    const calculateTotalOrderQuantity = () => {
      let totalQuantity = 0;
      let todayQuantity = 0;
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Iterate through each order
      orders.forEach((order) => {
        // Iterate through each item in the cartItems array of the order
        order.cartItems.forEach((item) => {
          totalQuantity += item.quantity;
        });

        // Check if the order date is today
        const orderDate = new Date(order.date);
        if (
          orderDate >= startOfToday &&
          orderDate < new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)
        ) {
          // Iterate through each item in the cartItems array of the order
          order.cartItems.forEach((item) => {
            todayQuantity += item.quantity;
          });
        }
      });

      // Update states with total order quantity and today's order quantity
      setTotalOrderQuantity(totalQuantity);
      setTodayOrderQuantity(todayQuantity);
    };
-
    // Call the function to calculate total and today's order quantities
    calculateTotalOrderQuantity();
  }, [orders]);

  // Function to filter orders by status and count them
  const countOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  const orderss = [
    { title: "New Order",status:'New', count: countOrdersByStatus("New"), icon: "🆕" },
    { title: "Pending Order",status:'Pending', count: countOrdersByStatus("Pending"), icon: "⏳" },
    { title: "Approved Order",status:'Approved', count: countOrdersByStatus("Approved"), icon: "✅" },
    { title: "Packaging Order",status:'Packaging', count: countOrdersByStatus("Packaging"), icon: "📦" },
    { title: "Shipment Order",status:'Shipment', count: countOrdersByStatus("Shipment"), icon: "🚚" },
    { title: "Delivered Order",status:'Delivered', count: countOrdersByStatus("Delivered"), icon: "😀" },
  ];



  const pieChartData = [
    { name: 'New', value: countOrdersByStatus('New') },
    { name: 'Pending', value: countOrdersByStatus('Pending') },
    { name: 'Approved', value: countOrdersByStatus('Approved') },
    { name: 'Packaging', value: countOrdersByStatus('Packaging') },
    { name: 'Shipment', value: countOrdersByStatus('Shipment') },
    { name: 'Delivered', value: countOrdersByStatus('Delivered') }
  ];

  const barChartData = [
    { name: 'Today Sales', value: todayTotalSales },
    { name: 'Total Sales', value: totalSales },
  ];

  const barChartData2 = [
   
    { name: 'Today Orders', value: todayOrderQuantity },
    { name: 'Total Orders', value: totalOrderQuantity },
  
  ];
  const barChartData3 = [
    { name: 'Total Customers', value: totalUniquePhoneNumbers },
    { name: 'Total Products', value: products.length }
  ];

  return (
    <section className="">
      <Helmet>
        <title>Shokher Bazar | AdminDashboard</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet>
      <div className=" px-4 pt-8 pb-4 ">
        <div className="">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3">
            <Link to={"/dashboard/admin/todayOrders"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">Today's Sales</dt>
                <dd className="font-extrabold text-blue-600">৳ {todayTotalSales}</dd>
              </div>
            </Link>
            <Link to={"/dashboard/admin/todayOrders"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">Today's Orders</dt>
                <dd className="font-extrabold text-blue-600">{todayOrderQuantity}</dd>
              </div>
            </Link>
            <Link to={"/dashboard/admin/totalCustomers"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">All Customers</dt>
                <dd className="font-extrabold text-blue-600">{totalUniquePhoneNumbers}</dd>
              </div>
            </Link>
            <Link to={"/dashboard/admin/allOrders"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">Total Sales</dt>
                <dd className="font-extrabold text-blue-600">৳ {totalSales}</dd>
              </div>
            </Link>
            <Link to={"/dashboard/admin/allOrders"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">Total Orders</dt>
                <dd className="font-extrabold text-blue-600">{totalOrderQuantity}</dd>
              </div>
            </Link>
            <Link to={"/dashboard/admin/allProducts"} className="text-center">
              <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8">
                <dt className="text-lg font-medium text-gray-500">Total Products</dt>
                <dd className="font-extrabold text-blue-600">{products.length}</dd>
              </div>
            </Link>
          </dl>
        </div>


       

<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4  pt-4 pb-4  ">

            {orderss.map((order, index) => (
                <div
                    key={index}
                    className="bg-gray-800 text-white rounded-lg p-6 flex flex-col items-center justify-between"
                    onClick={() => handleOrderClick(order.status)}
                >
                    <div className="text-4xl mb-2">{order.icon}</div>
                    <div className="text-lg font-semibold mb-4 text-center">{order.title}</div>
                    <button className="bg-red-500 text-white rounded-full py-2 px-6">
                        + {order.count}
                    </button>
                </div>
            ))}
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4  pb-4  ">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold ">Orders by Status</h3>

            <PieChartComponent data={pieChartData} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <BarChartComponent data={barChartData} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <BarChartComponent data={barChartData2} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <BarChartComponent data={barChartData3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
