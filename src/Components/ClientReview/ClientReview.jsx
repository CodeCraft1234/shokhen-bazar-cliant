import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const ClientReview = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="py-10 bg-gray-100 mt-12">
            <h2 className="text-center text-3xl font-semibold mb-6">What your client says</h2>
            <div className="container mx-auto">
                <Slider {...settings}>
                    <div className="p-2">
                        <img src="path_to_image_1" alt="Client 1" className="w-full h-auto rounded-lg"/>
                    </div>
                    <div className="p-2">
                        <img src="path_to_image_2" alt="Client 2" className="w-full h-auto rounded-lg"/>
                    </div>
                    <div className="p-2">
                        <img src="path_to_image_3" alt="Client 3" className="w-full h-auto rounded-lg"/>
                    </div>
                    <div className="p-2">
                        <img src="path_to_image_4" alt="Client 4" className="w-full h-auto rounded-lg"/>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default ClientReview;
