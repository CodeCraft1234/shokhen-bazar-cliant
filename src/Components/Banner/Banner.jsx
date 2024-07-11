import React from 'react';

const products = [
    { id: 1, image: 'https://i.ibb.co/Bz6dv2B/pacepack.webp', title: 'উজ্জ্বল ফর্সা মুখ' },
    { id: 2, image: 'https://i.ibb.co/Df7xYfx/hair-pack.webp', title: 'শক্ত মজবুত চুল' },
    { id: 3, image: 'https://i.ibb.co/D7dm8F2/hair-oil.webp', title: 'কালো ও মজবুত চুল' },
    { id: 4, image: 'https://i.ibb.co/HzJCKzN/drandraf-pack.webp', title: 'খুশকি মুক্ত চুল' },
    { id: 5, image: 'https://i.ibb.co/TMjSrSp/acne-pack.webp', title: 'রন থেকে মুক্তি' },
    { id: 6, image: 'https://i.ibb.co/RNF6C86/body-pack-1.webp', title: 'ঘামের মঝুর করণ' },
    { id: 7, image: 'https://i.ibb.co/GtC7JDf/Paikari-Ghor-lip-balm-new.webp', title: 'লিপবাম' },
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
        <div className="mt-16 flex flex-wrap justify-center bg-green-600 p-4 overflow-hidden">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className="m-4 p-4 rounded-full shadow-lg"
                    style={{ width: '200px', height: '150px', backgroundColor: backgroundColors[index % backgroundColors.length] }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-3/4 object-cover rounded-full"
                    />
                    <div className="text-center mt-12 text-white hover:text-yellow-300 transition-colors duration-300">
                        {product.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
