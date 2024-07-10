
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Login from "../Security/Login";
import AuthProvider from "../Security/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardRoot from "./Pages/Dashboard/DashboardRoot";
import AddProduct from "./Pages/Dashboard/Routes/AddProducts";
import AdminHome from "./Pages/Dashboard/AdminHome";
import TodayOrders from "./Pages/Dashboard/Routes/TodayOrders";
import TotalCustomers from "./Pages/Dashboard/Routes/TotalCustomers";
import OrderDetailsFinal from "./Pages/Dashboard/Routes/OrderDetailsFinal";
import AllOrders from "./Pages/Dashboard/Routes/AllOrders";
import UpdateProducts from "./Pages/Dashboard/Routes/Updateproducts";
import AddLinks from "./Pages/Dashboard/AddLinks";
import Settings from "./Pages/Dashboard/Settings";
import Support from "./Pages/Dashboard/Support";
import AddLogos from "./Pages/Dashboard/AddLogos";
import AddNumber from "./Pages/Dashboard/AddNumber";
import AllUsers from "./Pages/Dashboard/Routes/AllUsers";
import Notifications from "./Pages/Dashboard/Routes/Notifications";
import AddBanner from "./Pages/Dashboard/AddBanner";
import AllProduct from "./Pages/Dashboard/Routes/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'dashboard',
        element:<DashboardRoot></DashboardRoot>,
        children:[
          {
            path:'/dashboard/admin/addProduct',
            element:<AddProduct></AddProduct>
          },
          {
            path:'/dashboard/admin/adminHome',
            element:<AdminHome></AdminHome>
          },
          {
            path:'/dashboard/admin/todayOrders',
            element:<TodayOrders></TodayOrders>
          },
          {
            path:'/dashboard/admin/totalCustomers',
            element:<TotalCustomers></TotalCustomers>
          },
          {
            path:'/dashboard/admin/orders/:status',
            element:<OrderDetailsFinal></OrderDetailsFinal>
          },
          {
            path:'/dashboard/admin/allOrders',
            element:<AllOrders></AllOrders>
          },
          {
            path:'/dashboard/admin/allProducts',
            element:<AllProduct></AllProduct>
          },
          {
            path:'/dashboard/admin/updateProducts/:id',
            element:<UpdateProducts></UpdateProducts>,
            loader: ({ params }) => fetch(`https://hirikbazar.vercel.app/products/${params.id}`)
          },
          {
            path: "/dashboard/admin/addLinks",
            element: <AddLinks />,
          },
          {
            path: "/dashboard/admin/settings",
            element: <Settings />,
          },
          {
            path: "/dashboard/admin/support",
            element: <Support />,
          },
          {
            path: "/dashboard/admin/addLogos",
            element: <AddLogos />,
          },
          {
            path: "/dashboard/admin/addNumber",
            element: <AddNumber />,
          },
          {
            path: "/dashboard/admin/manageUsers",
            element: <AllUsers />,
          },
          {
            path: "/dashboard/admin/notifications",
            element: <Notifications />,
          },
          {
            path: "/dashboard/admin/addBanner",
            element: <AddBanner />,
          },
        ]
      }
    ]
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
   <HelmetProvider>
         <AuthProvider>
               <RouterProvider router={router} />
          </AuthProvider> 
    </HelmetProvider> 
    </QueryClientProvider>
  </React.StrictMode>
);