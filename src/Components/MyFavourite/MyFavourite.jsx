import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../ProductCard/ProductCard";


const MyFavourite = () => {
    const [cartItems, setCartItems] = useState([]);
    console.log(cartItems)
    useEffect(() => {
        // Retrieve cart items from localStorage
        const storedCart = localStorage.getItem("shokherfavourite");
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

    return (
        <div className=" pt-36 mb-5">
           <Helmet>
                <title>বিশ্বস্ত-বাজার | My Favourite</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <h1 className="text-2xl font-bold mb-3 text-center text-black">My Favourite</h1>
             <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  mx-8">

{cartItems.map((item) => (
  <ProductCard key={item._id} item={item}></ProductCard>
))}
</div>
        </div>
    );
};

export default MyFavourite;