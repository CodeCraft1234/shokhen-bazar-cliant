import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PopularDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-20">Product not found</div>;
    }

    return (
        <div className="container mx-auto p-5">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <div className="grid grid-cols-3 gap-2">
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Product image ${index}`} className="w-full h-auto" />
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 md:pl-10">
                    <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <span className="text-yellow-500 font-bold text-2xl mb-4 block">{product.price}</span>
                    <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Related Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Map through related products and display them here */}
                </div>
            </div>
        </div>
    );
};

export default PopularDetails;
