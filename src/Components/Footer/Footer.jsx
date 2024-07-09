import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-10">
            <div className="container mx-auto flex flex-col items-center mb-10">
                <div className="flex items-center w-full justify-center">
                    <hr className="border-t border-gray-600 flex-grow" />
                    <img 
                        src="https://i.ibb.co/z2PB4mv/paikarighor-e1641451044717.png" 
                        alt="Logo" 
                        className="mx-4 w-36"
                    />
                    <hr className="border-t border-gray-600 flex-grow" />
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
                    <p>For any kind of information <br /> call this number:</p>
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
                        <input type="email" placeholder="Your Email..." className="p-2 w-full text-black"/>
                        <button className="bg-yellow-500 text-white font-bold py-2 px-4 hover:bg-yellow-600 transition duration-300">SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto flex flex-wrap justify-between items-center mt-10">
                <p className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">Copyright © 2023 Paikarighor. All Rights Reserved.</p>
                <div className="flex justify-center md:justify-end space-x-4 w-full md:w-auto">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="w-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Amex_logo_1975.png" alt="AmEx" className="w-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg" alt="PayPal" className="w-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Discover_Card_logo.svg" alt="Discover" className="w-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/CO-OP_Financial_Services_logo.svg" alt="COD" className="w-10"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
