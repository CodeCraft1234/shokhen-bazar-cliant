import React from 'react';
import { useParams } from 'react-router-dom';

const products = [
    { id: 1, image: 'https://i.ibb.co/D7dm8F2/hair-oil.webp', title: 'Shine Your Hair', description: '* one Order call away', buttonText: '100% ORGANIC', buttonClass: 'bg-yellow-400' },
    { id: 2, image: 'https://i.ibb.co/Df7xYfx/hair-pack.webp', title: 'Organic FacePack', description: 'For Online Orders Click Here.', buttonText: 'TOP SELLING', buttonClass: 'bg-yellow-400' },
    { id: 3, image: 'https://i.ibb.co/Bz6dv2B/pacepack.webp', title: 'Organic Hair pack', description: 'For Online Orders in Wednesdays.', buttonText: 'BEST PRODUCT', buttonClass: 'bg-blue-400' },
    { id: 4, image: 'https://i.ibb.co/HzJCKzN/drandraf-pack.webp', title: 'Secret Body pack', description: 'Double Sauce', buttonText: 'WHITE TONE', buttonClass: 'bg-white text-black' }
];

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto p-4 mt-20">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="relative w-full h-[420px]">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                        <h1 className="text-4xl font-bold">{product.title}</h1>
                        <p className="mt-2">{product.description}</p>
                        <button className={`mt-4 px-4 py-2 rounded text-black hover:text-gray-700 font-bold ${product.buttonClass}`}>
                            {product.buttonText}
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{product.title}</h2>
                    <p className="mt-4">{product.description}</p>
                    <button className={`mt-4 px-4 py-2 rounded text-black hover:text-gray-700 font-bold ${product.buttonClass}`}>
                        {product.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
