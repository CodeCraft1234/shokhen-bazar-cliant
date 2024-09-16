import { motion } from 'framer-motion';

const AlwaysOrganic = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage: 'url(https://i.ibb.co/6NGQVRd/paikarighar-8-scaled-800x533.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // This line makes the background fixed
      }}
    >
      <div className="flex text-start items-center justify-start px-6 sm:px-10 md:px-16 lg:px-28 py-10 lg:py-20">
        <div className="text-white text-start mt-10 lg:mt-0">
          <h3 className="font-bold text-yellow-700 text-lg sm:text-xl md:text-2xl mb-4">
            Always Organic
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black font-bold mb-4">
            Made Right. Make Beauty. Made Especially For You.
          </h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Paikarighor is a 100% Organic Product for the best solutions of Hair fall solution,
            hair fall treatment, secret hair oil, face pack, best lip balm.
          </p>
          <button className="mt-5 px-6 sm:px-8 py-2 sm:py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:text-white transition">
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlwaysOrganic;
