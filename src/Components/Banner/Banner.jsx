import React from 'react';

const products = [
    { id: 1, image: 'https://i.ibb.co/Bz6dv2B/pacepack.webp', title: 'উজ্জ্বল ফর্সা মুখ' },
    { id: 2, image: 'https://i.ibb.co/Df7xYfx/hair-pack.webp', title: 'শক্ত মজবুত চুল' },
    { id: 3, image: 'https://i.ibb.co/D7dm8F2/hair-oil.webp', title: ' মজবুত চুল' },
    { id: 4, image: 'https://i.ibb.co/HzJCKzN/drandraf-pack.webp', title: 'খুশকি মুক্ত চুল' },
    { id: 5, image: 'https://i.ibb.co/TMjSrSp/acne-pack.webp', title: 'রন থেকে মুক্তি' },
    { id: 6, image: 'https://i.ibb.co/RNF6C86/body-pack-1.webp', title: 'ঘামের মঝুর করণ' }
];

const backgroundColors = [
    '#FFFFFF', // light peach
    '#C1E1FF', 
    '#C1E1FF', // light green
    '#C1E1FF', // light blue
    '#C1E1FF',
    '#FFFFFF', // light purple
    '#D9EAD3', // light olive green
];

const Banner = () => {
    return (
        <div className="mt-24 flex flex-wrap py-8 lg:py-24 justify-center text-white px-6 md:px-24 bg-green-600 overflow-hidden">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className="m-2 p-2 rounded-full py-5 shadow-lg flex flex-col items-center justify-center"
                    style={{ 
                        width: '150px', 
                        height: '150px', 
                        backgroundColor: backgroundColors[index % backgroundColors.length] 
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 md:w-full md:h-full mt-4 md:mt-14 object-cover rounded-full"
                    />
                    <div className="text-center mt-2 md:mt-6 text-xs md:text-base leading-tight hover:text-yellow-300 text-black lg:text-white transition-colors duration-300">
                        {product.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
