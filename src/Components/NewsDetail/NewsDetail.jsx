import React from 'react';
import { useParams } from 'react-router-dom';

const newsData = [
    {
        id: 1,
        title: "করিয়ানদের উজ্জ্বল ত্বকের আসল রহস্য – প্রাকৃতিক ফেইস প্যাক?",
        date: "June 23, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/317W7sT/secret-face-pack-to-glow-like-korean-500x330.webp",
        content: "Full content of the news article 1..."
    },
    {
        id: 2,
        title: "প্রাকৃতিক উপায়ে এলোভেরা দিয়ে মুখের মেছতা দূর করার ১০০% কার্যকরী উপায়",
        date: "May 7, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
        content: "Full content of the news article 2..."
    },
    {
        id: 3,
        title: "অতিরিক্ত গরমে ঘরে বসে পেতে ফর্সা ফর্সা করার বডি লোশন। ১০০% ন্যাচারাল",
        date: "May 2, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
        content: "Full content of the news article 3..."
    },
];

const NewsDetail = () => {
    const { id } = useParams();
    const news = newsData.find(n => n.id === parseInt(id));

    if (!news) {
        return <div>News not found</div>;
    }

    return (
        <div className="container mx-auto px-4 mt-24 mb-4">
            <div className="flex flex-col lg:flex-row lg:space-x-6">
                {/* Left side large image */}
                <div className="relative lg:w-2/3 mb-6 lg:mb-0">
                    <img src={news.image} alt={news.title} className="w-full h-96 object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                        <h1 className="text-4xl font-bold">{news.title}</h1>
                        <p className="mt-2">{news.date} / Post by {news.author}</p>
                    </div>
                </div>
                {/* Right side content */}
                <div className="lg:w-1/3">
                    <h2 className="text-3xl font-bold mb-4">{news.title}</h2>
                    <p className="text-gray-600 mb-4">{news.date} / Post by {news.author}</p>
                    <div className="text-gray-800">
                        <p>{news.content}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                    <img src="https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webpg" alt="Banner" className="w-full h-auto rounded-lg" />
                </div>
                <div className="flex flex-col lg:col-span-1">
                    <img src="https://i.ibb.co/317W7sT/secret-face-pack-to-glow-like-korean-500x330.webp" alt="Related 1" className="mb-4 w-full h-60 object-cover rounded-lg" />
                    <img src="https://i.ibb.co/317W7sT/secret-face-pack-to-glow-like-korean-500x330.webp" alt="Related 2" className="w-full h-60 object-cover rounded-lg" />
                </div>
                <div className="lg:col-span-1">
                    <img src="https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webpg" alt="Related 3" className="w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
