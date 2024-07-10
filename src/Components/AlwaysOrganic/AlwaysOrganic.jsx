import React from 'react';
import { motion } from 'framer-motion';

const AlwaysOrganic = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between  p-10 lg:p-20" style={{ backgroundImage: 'url(https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative flex-1"
            >
                <img src="https://i.ibb.co/H4ypF3v/leftside.png" alt="Organic Product" className="w-full h-auto rounded-lg" />
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute top-5 left-5 bg-yellow-500 text-white text-lg font-semibold py-1 px-3 rounded-lg shadow-lg"
                >
                    30% OFF
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-1 text-center lg:text-left mt-10 lg:mt-0"
            >
                <h3 className="text-yellow-700 text-2xl mb-4">Always Organic</h3>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Made Right. Make Beauty. Made Especially For You.
                </h1>
                <p className="text-black mb-6">
                    Paikarighor is a 100% Organic Product for the best solutions of Hair fall solution,
                    hair fall treatment, secret hair oil, face pack, best lip balm.
                </p>
                <button
                   
                    className="mt-5 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:text-white transition"
                >
                    ORDER NOW
                </button>
            </motion.div>
        </div>
    );
};

export default AlwaysOrganic;
