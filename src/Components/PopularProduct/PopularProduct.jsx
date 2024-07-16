import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PopularProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                const allPackProducts = response.data.filter(product => product.category === 'allPack');
                const firstTwoProducts = allPackProducts.slice(0, 2);
                setProducts([...firstTwoProducts, ...firstTwoProducts]); // Repeat the first two products to make 4 cards
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Product</h2>
            <div className="flex justify-between items-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <a href="#" className="text-green-600 hover:text-green-800 ml-4">See all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative group">
                        <Link to={`/productDetails/${product._id || product.id}`} className="flex flex-col h-full">
                            <img className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110" src={product.image} alt={product.title} />
                            </Link>
                            <button className="absolute top-2 right-2 bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300">
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 hover:text-yellow-500 transition-all duration-300">{product.title}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-500 font-bold">{product.price}</span>
                                <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300 flex items-center">
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProduct;