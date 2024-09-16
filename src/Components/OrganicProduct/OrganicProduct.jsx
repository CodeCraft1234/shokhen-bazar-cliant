import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
    { id: 1, image: 'https://i.ibb.co/D7dm8F2/hair-oil.webp', title: 'Shine Your Hair', description: '* one Order call away', buttonText: '100% ORGANIC', buttonClass: 'bg-yellow-400' },
    { id: 2, image: 'https://i.ibb.co/Df7xYfx/hair-pack.webp', title: 'Organic FacePack', description: 'For Online Orders Click Here.', buttonText: 'TOP SELLING', buttonClass: 'bg-yellow-400' },
    { id: 3, image: 'https://i.ibb.co/Bz6dv2B/pacepack.webp', title: 'Organic Hair pack', description: 'For Online Orders in Wednesdays.', buttonText: 'BEST PRODUCT', buttonClass: 'bg-blue-400' },
    { id: 4, image: 'https://i.ibb.co/HzJCKzN/drandraf-pack.webp', title: 'Secret Body pack', description: 'Double Sauce', buttonText: 'WHITE TONE', buttonClass: 'bg-white text-black' }
];

const OrganicProduct = () => {
    const navigate = useNavigate();

    const handleButtonClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="mx-5 sm:mx-10 md:mx-16 lg:mx-28 grid gap-5 my-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Left side large image */}
            <div className="relative h-full lg:col-span-2">
                <div className="relative w-full h-[300px] md:h-[350px] lg:h-[420px]">
                    <img src={products[0].image} alt={products[0].title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{products[0].title}</h1>
                        <p className="mt-2 text-sm sm:text-base">{products[0].description}</p>
                        <button
                            onClick={() => handleButtonClick(products[0].id)}
                            className={`mt-4 px-3 sm:px-4 py-2 rounded text-black hover:text-gray-700 font-bold ${products[0].buttonClass}`}>
                            {products[0].buttonText}
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle two images */}
            <div className="flex flex-col space-y-4 lg:col-span-1">
                {products.slice(1, 3).map(product => (
                    <div key={product.id} className="relative h-1/2">
                        <div className="relative w-full h-[180px] md:h-[200px]">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{product.title}</h2>
                                <p className="mt-2 text-sm sm:text-base">{product.description}</p>
                                <button
                                    onClick={() => handleButtonClick(product.id)}
                                    className={`mt-4 px-3 sm:px-4 py-2 text-black hover:text-gray-700 rounded font-bold ${product.buttonClass}`}>
                                    {product.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right side single image */}
            <div className="relative h-full lg:col-span-1">
                <div className="relative w-full h-[300px] md:h-[350px] lg:h-[420px]">
                    <img src={products[3].image} alt={products[3].title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{products[3].title}</h2>
                        <p className="mt-2 text-sm sm:text-base">{products[3].description}</p>
                        <button
                            onClick={() => handleButtonClick(products[3].id)}
                            className={`mt-4 px-3 sm:px-4 py-2 rounded text-black hover:text-gray-700 font-bold ${products[3].buttonClass}`}>
                            {products[3].buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganicProduct;
