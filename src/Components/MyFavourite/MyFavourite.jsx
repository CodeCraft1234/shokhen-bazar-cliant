import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../OurProduct/OurProduct"; // Importing components from OurProduct
import axios from 'axios';

const MyFavourite = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  useEffect(() => {
    // Retrieve favourite items from API or localStorage
    const fetchFavourites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favourites');
        setFavouriteItems(response.data);
      } catch (error) {
        console.error('Error fetching favourite items:', error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="pt-36">
      <Helmet>
        <title>Shokher Bazar | My Favourite</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-3 text-center text-black">
        My Favourite
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-8">
        {favouriteItems.length === 0 ? (
          <div className="text-center text-red-500 text-xl col-span-full">
            No favourite items found
          </div>
        ) : (
          favouriteItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyFavourite;
