import React from 'react';

const Guarantee = () => {
    return (
        <div className="mb-4 h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">We guarantee</h1>
                <button className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:text-white transition duration-300">
                              Make an Order                          </button>
            </div>
        </div>
    );
};

export default Guarantee;
