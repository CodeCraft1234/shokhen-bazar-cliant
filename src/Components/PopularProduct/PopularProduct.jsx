import React from 'react';

const PopularProduct = () => {
    const products = [
        {
            id: 1,
            image: 'https://i.ibb.co/XXMJ6Qb/Paikari-Ghor-Lip-Balm-Poster-3.jpg',
            title: 'PKG Secret Lip balm',
            description: 'Best Lip Balm For Lips In BD লিপবামের এক ধরণের তৈলাক্ত মসল যা আমাদের ঠোঁটকে...',
            price: '550.00৳',
        },
        {
            id: 2,
            image: 'https://i.ibb.co/XXMJ6Qb/Paikari-Ghor-Lip-Balm-Poster-3.jpg',
            title: 'সিক্রেট পোর মিনিমাইজার প্যাক',
            description: 'যে কোন ধরনের ত্বকের গর্ভের বিচ্ছু ত্বকের ছিদ্র দূর করতে এই প্যাক সবচেয়ে কার্যকর।...',
            price: '430.00৳',
        },
        {
            id: 3,
            image: 'https://i.ibb.co/XXMJ6Qb/Paikari-Ghor-Lip-Balm-Poster-3.jpg',
            title: 'সিক্রেট ট্যানরিমুভ প্যাক',
            description: 'ট্যানরিমুভ করতে এই প্যাক বেশ কার্যকর। এই ট্যানরিমুভ প্যাক নিয়মিত ব্যবহার...',
            price: '410.00৳',
        },
        {
            id: 4,
            image: 'https://i.ibb.co/XXMJ6Qb/Paikari-Ghor-Lip-Balm-Poster-3.jpg',
            title: 'সিক্রেট হেয়ারঅয়েল',
            description: 'পরিমাণ: ২৫০ মিলি ২-৩ মাস ব্যবহার করা যায়। কাজ: দূর করে প্রায় সকল সমস্যার...',
            price: '1,800.00৳',
        }
    ];

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Product</h2>
            <div className="flex justify-between items-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <a href="#" className="text-green-600 hover:text-green-800 ml-4">See all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(product => (
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
        </div>
    );
};

export default PopularProduct;
