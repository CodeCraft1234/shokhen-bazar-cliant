'use client'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientReview = () => {
    const reviews = [
        {
            id: 1,
            name: "John Doe",
            image: "https://i.ibb.co/mS8zLNb/unsplash-Si-Qgni-cq-Fg.png",
            review: "Great service! Very satisfied with the results."
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://i.ibb.co/DW5cpc3/unsplash-v3-Ol-BE6-fh-U.png",
            review: "Professional team, exceeded my expectations."
        },
        {
            id: 3,
            name: "Michael Johnson",
            image: "https://i.ibb.co/B2r2K6C/unsplash-XQWfro4-Lr-Vs.png",
            review: "Highly recommend! Timely delivery and superb quality."
        },
        {
            id: 4,
            name: "Emily Brown",
            image: "https://i.ibb.co/CKdSrxj/unsplash-l-RAWc-T7uwh-Y.png",
            review: "Impressed with their attention to detail. Will hire again."
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show 4 slides by default
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // Tablet responsive
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600, // Mobile responsive
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="py-10 px-4 sm:px-8 md:px-16 lg:px-24 mt-4">
            <h2 className="text-center text-2xl md:text-3xl text-black font-semibold mb-6">What Your Clients Say</h2>
            <div className="container mx-auto">
                <Slider {...settings}>
                    {reviews.map(review => (
                        <div key={review.id} className="p-2">
                            <div className="relative">
                                <img src={review.image} alt={`Client ${review.id}`} className="w-full h-56 md:h-72 rounded-lg"/>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-80">
                                    <div className="text-white text-center p-4">
                                        <p className="text-sm md:text-lg font-semibold">{review.name}</p>
                                        <p className="mt-2 text-xs md:text-sm">{review.review}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ClientReview;
