import { FaShippingFast, FaClock, FaStar } from "react-icons/fa";

const Services = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5 py-5 px-4 lg:px-24 text-black">
      {/* Easy Shipping Box */}
      <div className="service-box border-2 rounded-lg border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/3 lg:w-1/4 text-center hover:border-yellow-400 transition duration-300">
        <div className="flex flex-col items-center mb-2">
          <FaShippingFast className="text-6xl text-yellow-500" />
          <h3 className="text-xl font-semibold mb-2 mt-2">Easy Shipping</h3>
          <p className="text-gray-500">All Over Bangladesh</p>
        </div>
      </div>

      {/* Timely Delivery Box */}
      <div className="service-box border-2 rounded-lg border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/3 lg:w-1/4 text-center hover:border-yellow-400 transition duration-300">
        <div className="flex flex-col items-center mb-2">
          <FaClock className="text-6xl text-yellow-500" />
          <h3 className="text-xl font-semibold mb-2 mt-2">Timely Delivery</h3>
          <p className="text-gray-500">Fastest Delivery</p>
        </div>
      </div>

      {/* Best Quality Guarantee Box */}
      <div className="service-box border-2 rounded-lg border-dashed border-gray-300 p-5 w-full sm:w-5/12 md:w-1/3 lg:w-1/4 text-center hover:border-yellow-400 transition duration-300">
        <div className="flex flex-col items-center mb-2">
          <FaStar className="text-6xl text-yellow-500" />
          <h3 className="text-xl font-semibold mb-2 mt-2">Best Quality Guarantee</h3>
          <p className="text-gray-500">Paikarighor - Best Herbal Guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
