import React, { useState } from 'react';

const products = [
    { id: 1, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'PKG Secret Lip balm', description: 'Best Lip Balm For Lips In BD লিপবামের এক ধরণের তৈলাক্ত মসল যা আমাদের ঠোঁটকে...', price: '550.00৳', category: 'lip balm' },
    { id: 2, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট পোর মিনিমাইজার প্যাক', description: 'যে কোন ধরনের ত্বকের গর্ভের বিচ্ছু ত্বকের ছিদ্র দূর করতে এই প্যাক সবচেয়ে কার্যকর।...', price: '430.00৳', category: 'face pack' },
    { id: 3, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট ট্যানরিমুভ প্যাক', description: 'ট্যানরিমুভ করতে এই প্যাক বেশ কার্যকর। এই ট্যানরিমুভ প্যাক নিয়মিত ব্যবহার...', price: '410.00৳', category: 'tan remove' },
    { id: 4, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট হেয়ারঅয়েল', description: 'পরিমাণ: ২৫০ মিলি ২-৩ মাস ব্যবহার করা যায়। কাজ: দূর করে প্রায় সকল সমস্যার...', price: '1,800.00৳', category: 'hair oil' },
    { id: 5, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট ফেসপ্যাক', description: 'সিক্রেট ফেসপ্যাক পরিষ্কার: ২৫০ গ্রাম পর্যাপ্ত, ক্লিন ক্লেঞ্জ, ফ্রো এবং ব্রুড করা।...', price: '380.00৳', category: 'face pack' },
    { id: 6, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট একনিপ্যাক', description: 'এই প্যাক ফুল ব্রণের জন্য কার্যকরী এবং ত্বকের জন্য সেরা।...', price: '420.00৳', category: 'face pack' },
    { id: 7, image: 'https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg', title: 'সিক্রেট পোর মিনিমাইজার প্যাক', description: 'সে কোন ধরনের ত্বকের জন্য এই প্যাক কার্যকর।...', price: '430.00৳', category: 'face pack' }
];

const categories = [
    { name: 'All Pack', key: 'all' },
    { name: 'চুলের মঝুর', key: 'hair oil' },
    { name: 'মুখের মঝুর', key: 'face pack' },
    { name: 'মাঝুল', key: 'tan remove' },
    { name: 'লিপবাম', key: 'lip balm' },
];

const OurProduct = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab);

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Product</h2>
            <div className="flex justify-center mb-6">
                {categories.map(category => (
                    <button
                        key={category.key}
                        onClick={() => setActiveTab(category.key)}
                        className={`px-4 py-2 mx-2 rounded-full ${activeTab === category.key ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
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
        </div>
    );
};

export default OurProduct;
