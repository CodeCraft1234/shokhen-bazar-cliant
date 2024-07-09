import React from 'react';

const Guarantee = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/z2PB4mv/paikarighor-e1641451044717.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">We guarantee</h1>
                <button className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:text-white transition duration-300">
                              Make an Order                          </button>
            </div>
        </div>
    );
};

export default Guarantee;
