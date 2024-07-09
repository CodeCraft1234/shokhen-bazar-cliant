import React from 'react';

const newsData = [
    {
        id: 1,
        title: "করিয়ানদের উজ্জ্বল ত্বকের আসল রহস্য – প্রাকৃতিক ফেইস প্যাক?",
        date: "June 23, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/317W7sT/secret-face-pack-to-glow-like-korean-500x330.webp",
    },
    {
        id: 2,
        title: "প্রাকৃতিক উপায়ে এলোভেরা দিয়ে মুখের মেছতা দূর করার ১০০% কার্যকরী উপায়",
        date: "May 7, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
    },
    {
        id: 3,
        title: "অতিরিক্ত গরমে ঘরে বসে পেতে ফর্সা ফর্সা করার বডি লোশন। ১০০% ন্যাচারাল",
        date: "May 2, 2024",
        author: "Paikarighor FSIT",
        category: "ফেইসপ্যাক",
        image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
    },
];

const LatestNews = () => {
    return (
        <div className="container mx-auto px-4 mt-4 mb-4">
            <h2 className="text-3xl font-bold mb-8">Latest news</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.map((news) => (
                    <div key={news.id} className=" rounded-lg overflow-hidden shadow-lg transform transition duration-500 ">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-48 object-cover transition duration-500 ease-in-out transform hover:scale-110"
                        />
                        <div className="p-4">
                            <p className="text-gray-600 text-sm mb-1">{news.category} / {news.date} / Post by {news.author}</p>
                            <h3 className="text-lg font-semibold mb-2 hover:text-yellow-500 transition duration-300">{news.title}</h3>
                            <button className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:text-white transition duration-300">
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
