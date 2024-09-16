import React from "react";

const Guarantee = () => {
  return (
    <div
      className="relative w-full py-10 my-5 overflow-hidden h-[400px] md:h-[600px] bg-[#edf0ed] bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/SPmRb3R/56531572-environmental-protection-renewable-sustainable-energy.webp')",
      }}
    >
      {/* Text Content */}
      <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
        <h1 className="text-2xl md:text-3xl italic text-white mb-2 md:mb-4">We guarantee</h1>
        <h1 className="text-3xl md:text-5xl font-bold text-white">শখের বাজার</h1>
        <button className="mt-4 px-4 md:px-6 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition rounded">
          MAKE AN ORDER
        </button>
      </div>
    </div>
  );
};

export default Guarantee;
