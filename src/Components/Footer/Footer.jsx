import React, { useEffect, useState } from "react";
import useLogo from "../../Hook/useLogo";
import { Link } from "react-router-dom";

const Footer = () => {
  const [logo, setLogo] = useLogo();
  const [latestLogo, setLatestLogo] = useState(null);

  useEffect(() => {
    if (logo && logo.length > 0) {
      const sortedLogo = [...logo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latest = sortedLogo[0];
      setLogo(sortedLogo);
      setLatestLogo(latest);
    }
  }, [logo, setLogo]);

  return (
    <footer className="bg-black text-white p-10">
      <div className="container mx-auto flex flex-col items-center mb-10">
        <div className="flex items-center w-full justify-center">
          <hr className="border-t-1 border-gray-600 flex-grow" />
          <Link to={"/"}>
            <img
              className="h-10 w-16  sm:h-16 sm:w-16 md:h-14 md:w-14 lg:h-16 lg:w-32"
              src={latestLogo?.photo}
              alt="Logo"
            />
          </Link>
          <hr className="border-t-1 border-gray-600 flex-grow" />
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
          <h5 className="font-bold text-xl mb-2">ADDRESS</h5>
          <p>গাজীপুর</p>
          <p>ঢাকা</p>
          <p>বাংলাদেশ</p>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
          <h5 className="font-bold text-xl mb-2">HELPLINE</h5>
          <p>
            For any kind of information <br /> call this number:
          </p>
          <p className="text-yellow-500 font-bold">01407-010352</p>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0 text-center md:text-left">
          <h5 className="font-bold text-xl mb-2">OPENING HOURS</h5>
          <p>Monday - Friday: 8am - 4pm</p>
          <p>Saturday: 9am - 5pm</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-yellow-500">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-yellow-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/4 text-center md:text-left">
          <h5 className="font-bold text-xl mb-2">NEWSLETTER</h5>
          <p>Subscribe to the weekly newsletter for all the latest updates</p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Your Email..."
              className="p-2 w-full text-black"
            />
            <button className="bg-yellow-500 text-black font-bold py-2 px-4 hover:text-white transition duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap justify-between items-center mt-10">
        <p className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
          Copyright © 2023{" "}
          <a href="https://shokherbazar.netlify.app/">
            <span className="text-yellow-500">Paikarighor</span>
          </a>{" "}
          . All Rights Reserved.
        </p>
        <div className="flex justify-center md:justify-end space-x-4 w-full md:w-auto">
          <img
            src="https://i.ibb.co/BB35LPk/footer-img1.png"
            alt="COD"
            className="w-84"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
