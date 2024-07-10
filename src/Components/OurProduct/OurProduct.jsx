import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [
    { name: 'All Pack', key: 'all' },
    { name: 'চুলের মঝুর', key: 'hair oil' },
    { name: 'মুখের মঝুর', key: 'face pack' },
    { name: 'মাঝুল', key: 'tan remove' },
    { name: 'লিপবাম', key: 'lip balm' },
];

const OurProduct = () => {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Product</h2>
            <div className="flex justify-center mb-6">
                {categories.map(category => (
                    <button
                        key={category.key}
                        onClick={() => setActiveTab(category.key)}
                        className={`px-4 py-2 mx-2 rounded-full ${activeTab === category.key ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-300 text-xs sm:text-sm md:text-base`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            {filteredProducts.length === 0 ? (
                <div className="text-center text-red-500 text-xl">No data available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative group">
                                <img className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110" src={product.image} alt={product.title} />
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
            )}
        </div>
    );
};

export default OurProduct;
