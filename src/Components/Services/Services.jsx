import React from "react";

const Services = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-around lg:justify-between p-5">
      <div className="service-box border-2 border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/4 lg:w-1/3 text-center m-2 lg:mx-2 hover:border-yellow-400 transition duration-300">
        <div className="mb-2">
          <img src="path_to_easy_shipping_icon" alt="Easy Shipping" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Easy shipping</h3>
        <p className="text-gray-500">All Over Bangladesh</p>
      </div>
      <div className="service-box border-2 border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/4 lg:w-1/3 text-center m-2 lg:mx-2 hover:border-yellow-400 transition duration-300">
        <div className="mb-2">
          <img src="path_to_timely_delivery_icon" alt="Timely Delivery" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
        <p className="text-gray-500">Fastest Delivery</p>
      </div>
      <div className="service-box border-2 border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/4 lg:w-1/3 text-center m-2 lg:mx-2 hover:border-yellow-400 transition duration-300">
        <div className="mb-2">
          <img src="path_to_best_quality_icon" alt="Best Quality Guarantee" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Best Quality Guarantee</h3>
        <p className="text-gray-500">Paikarighor - Best Herbal Guarantee</p>
      </div>
    </div>
  );
};

export default Services;
