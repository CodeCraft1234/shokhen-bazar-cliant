import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
    { name: 'All Pack', key: 'all' },
    { name: 'চুলের মঝুর', key: 'hair oil' },
    { name: 'মুখের মঝুর', key: 'face pack' },
    { name: 'মাঝুল', key: 'tan remove' },
    { name: 'লিপবাম', key: 'lip balm' },
];

const truncateText = (text, limit) => {
    if (!text) return ''; // Return an empty string if text is undefined or null
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit) + '...';
};

const OurProduct = () => {
    
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://shokher-bazar.vercel.app/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setIsModalOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
    };

    const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab);

    const calculateSubtotal = () => {
        return cart.reduce((total, product) => total + parseFloat(product.price.replace('৳', '')) * product.quantity, 0);
    };

    const navigate = useNavigate();

    const handleFavourite = (id, title, price, short, image) => {
        const cartItem = { id, title, price, short, image };
        let cart = localStorage.getItem("favourite");
    
        if (!cart) {
          cart = [];
        } else {
          try {
            cart = JSON.parse(cart);
          } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            cart = [];
          }
        }
    
        if (!Array.isArray(cart)) {
          cart = [];
        }
    
        cart.push(cartItem);
        localStorage.setItem("favourite", JSON.stringify(cart));
        navigate(location?.state ? location.state : "/myFavourite");
      };

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
                                <button onClick={() => handleFavourite(_id, title, price, short, image)} className="absolute top-2 right-2 bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300">
                                    <i className="fas fa-heart"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 hover:text-yellow-500 transition-all duration-300">{product.title}</h3>
                                <p className="text-gray-600 mb-4">{truncateText(product.description, 100)}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-yellow-500 font-bold">{product.price}</span>
                                    <button onClick={() => addToCart(product)} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300 flex items-center">
                                        <i className="fas fa-shopping-cart mr-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg overflow-hidden w-full max-w-md mx-auto">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h3 className="text-xl font-bold">Shopping Cart</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="p-4">
                        {cart.length === 0 ? (
                            <div className="text-center text-red-500">Your cart is empty</div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <img className="w-16 h-16 rounded-full object-cover mr-4" src={item.image} alt={item.title} />
                                    <div className="flex-grow">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-gray-600">{item.price}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-4 border-t flex justify-between items-center">
                        <span className="font-bold">Subtotal:</span>
                        <span className="text-yellow-500 font-bold">{calculateSubtotal().toFixed(2)}৳</span>
                    </div>
                    <div className="p-4 flex justify-between">
                        <Link to="/checkout" className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:text-white transition-all duration-300">
                            CHECKOUT
                        </Link>
                        <Link to="/myCart" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition-all duration-300">
                            VIEW CART
                        </Link>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default OurProduct;
