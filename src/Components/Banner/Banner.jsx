import React from 'react';

const products = [
    { id: 1, image: '/mnt/data/1stimage.png', title: 'উজ্জ্বল ফর্সা মুখ' },
    { id: 2, image: '/mnt/data/1stimage.png', title: 'শক্ত মজবুত চুল' },
    { id: 3, image: '/mnt/data/1stimage.png', title: 'কালো ও মজবুত চুল' },
    { id: 4, image: '/mnt/data/1stimage.png', title: 'খুশকি মুক্ত চুল' },
    { id: 5, image: '/mnt/data/1stimage.png', title: 'রন থেকে মুক্তি' },
    { id: 6, image: '/mnt/data/1stimage.png', title: 'ঘামের মঝুর করণ' },
    { id: 7, image: '/mnt/data/1stimage.png', title: 'লিপবাম' },
];

const Banner = () => {
    return (
        <div className="mt-36 flex justify-center bg-green-600 p-4 overflow-x-auto">
            {products.map(product => (
                <div 
                    key={product.id} 
                    className="m-4 p-4 bg-white rounded-full shadow-lg"
                    style={{ width: '200px', height: '150px' }}
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
