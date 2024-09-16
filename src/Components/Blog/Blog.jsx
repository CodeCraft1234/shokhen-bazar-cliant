import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const navigate = useNavigate();

    const handleReadMore = (id) => {
        navigate(`/news/${id}`);
    };
    const blogPosts = [
        {
            id: 1,
            title: "করিয়ানদের উজ্জ্বল ত্বকের আসল রহস্য...",
            description: "This is a description of the first blog post.",
            date: "January 1, 2024",
            image: "https://i.ibb.co/317W7sT/secret-face-pack-to-glow-like-korean-500x330.webp",
            link: "/blog/first-post"
        },
        {
            id: 2,
            title: "প্রাকৃতিক উপায়ে এলোভেরা দিয়ে...",
            description: "This is a description of the second blog post.",
            date: "February 2, 2024",
            image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
            link: "/blog/second-post"
        },
        {
            id: 3,
            title: "অতিরিক্ত গরমে ঘরে বসে পেতে ফর্সা...",
            description: "This is a description of the third blog post.",
            date: "March 3, 2024",
            image: "https://i.ibb.co/cYt11nf/remove-freckles-using-elovera-500x330.webp",
            link: "/blog/third-post"
        }
        // Add more blog posts here
    ];

    return (
        <div className="container mx-auto mt-28 p-4">
             <Helmet>
        <title>Shokher Bazar | Blog</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
            <h1 className="text-3xl text-center text-black mt-2 font-bold mb-2">Our Blog</h1>
            <div className="flex flex-wrap">
                {/* Left Sidebar */}
                <div className="w-full lg:w-1/4 p-4">
                    <div className="sticky top-4 space-y-4">
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Recent Posts</h2>
                            <ul>
                                {blogPosts.map((news, index) => (
                                    <li key={index} className="mb-2">
                                        <button onClick={() => handleReadMore(news.id)} className="text-yellow-500 hover:text-yellow-600">{news.title}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Recent Comments</h2>
                            <p>No comments yet.</p>
                        </div>
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Search</h2>
                            <input type="text" placeholder="Search..." className="w-full p-2 border rounded"/>
                        </div>
                    </div>
                </div>
                {/* Main Content */}
                <div className="w-full lg:w-1/2 p-4">
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                        {blogPosts.map((news, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
                                <img className="w-full h-48 object-cover" src={news.image} alt={news.title} />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                                    <p className="text-gray-600 mb-4">{news.date}</p>
                                    <p className="text-gray-800">{news.description}</p>
                                    <button onClick={() => handleReadMore(news.id)}
                                        href={news.link} 
                                        className="block mt-4 text-yellow-500 hover:text-yellow-600 font-bold"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right Sidebar */}
                <div className="w-full lg:w-1/4 p-4">
                    <div className="sticky top-4 space-y-4">
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Popular Tags</h2>
                            <div className="flex flex-wrap">
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 m-1 rounded-full">Tag 1</span>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 m-1 rounded-full">Tag 2</span>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 m-1 rounded-full">Tag 3</span>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 m-1 rounded-full">Tag 4</span>
                                {/* Add more tags as needed */}
                            </div>
                        </div>
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Archives</h2>
                            <ul>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">July 2024</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">June 2024</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">May 2024</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">April 2024</a></li>
                                {/* Add more archives as needed */}
                            </ul>
                        </div>
                        <div className="border p-4 rounded">
                            <h2 className="text-xl font-bold mb-2">Categories</h2>
                            <ul>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">চুলের যত্ন</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">ত্বকের যত্ন</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">মাজুফল</a></li>
                                <li><a href="#" className="text-yellow-500 hover:text-yellow-600">লিপবাম</a></li>
                                {/* Add more categories as needed */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
