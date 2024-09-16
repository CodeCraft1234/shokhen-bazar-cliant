import React from 'react';
import { useNavigate } from 'react-router-dom';

const newsData = [
    {
        id: 1,
        title: "করিয়ানদের উজ্জ্বল ত্বকের আসল রহস্য – প্রাকৃতিক ফেইস প্যাক?",
        date: "June 23, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co.com/syVHrgK/1000x565.jpg",
    },
    {
        id: 2,
        title: "প্রাকৃতিক উপায়ে এলোভেরা দিয়ে মুখের মেছতা দূর করার ১০০% কার্যকরী উপায়",
        date: "May 7, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co.com/gFsMMpS/paikarighar-6-scaled.jpg",
    },
    {
        id: 3,
        title: "অতিরিক্ত গরমে ঘরে বসে ফর্সা করার বডি লোশন। ১০০% ন্যাচারাল",
        date: "May 2, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co.com/DGHsW4m/paikarighar-8-scaled.jpg",
    },
    {
        id: 4,
        title: "মুখের বলিরেখা দূর করার জন্য ৫টি কার্যকরী প্রাকৃতিক টিপস",
        date: "April 18, 2024",
        author: "Paikarighor FSIT",
        category: "ত্বকের যত্ন",
        image: "https://i.ibb.co.com/d2FbCjY/maxresdefault.jpg",
    },
    {
        id: 5,
        title: "ত্বক উজ্জ্বল করার ৩টি প্রাকৃতিক ঘরোয়া উপায়",
        date: "March 30, 2024",
        author: "Paikarighor FSIT",
        category: "ত্বকের যত্ন",
        image: "https://i.ibb.co.com/ZLDzTFY/1714815164-bg3.jpg",
    },
    {
        id: 6,
        title: "ত্বকের ময়লা দূর করার ১০০% কার্যকরী ঘরোয়া স্ক্রাব",
        date: "February 25, 2024",
        author: "Paikarighor FSIT",
        category: "ত্বকের যত্ন",
        image: "https://i.ibb.co.com/8z5qr3T/face-3-20231112145117.jpg",
    },
];

const LatestNews = () => {
    const navigate = useNavigate();

    const handleReadMore = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-28 mt-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {newsData.map((news) => (
                    <div
                        key={news.id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-105 flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-48 sm:h-56 object-cover transition duration-500 ease-in-out transform hover:scale-110"
                        />
                        {/* Content */}
                        <div className="p-4 sm:p-6 flex flex-col flex-grow">
                            <p className="text-gray-500 text-xs sm:text-sm mb-2">{news.category} / {news.date} / By {news.author}</p>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 hover:text-yellow-500 transition duration-300">
                                {news.title}
                            </h3>
                            {/* Spacer to push button to the bottom */}
                            <div className="flex-grow"></div>
                            <button
                                onClick={() => handleReadMore(news.id)}
                                className="mt-4 px-4 sm:px-6 py-2 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition duration-300 focus:outline-none self-end"
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestNews;
