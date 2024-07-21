import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <div className="text-white text-4xl font-bold">
            NAVJEEVANA
            </div>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-lg">“We are reviving the traditional ways of old Bharat”</p>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-center sm:justify-end">
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-l-md text-gray-700"
              />
              <button className="p-2 bg-gray-600 text-white rounded-r-md">→</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-start mt-8">
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-xl mb-2">Helpful Links</h3>
            <ul>
              <li><Link to={"/"} className="text-sm block">Home</Link></li>
              <li><Link to={"/allproducts"} className="text-sm block">All Products</Link></li>
              <li><Link to={"/our-story"} className="text-sm block">Our Story</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-xl mb-2">Contact Us</h3>
            <ul>
              <li><a href="#" className="text-sm block">Help</a></li>
              <li><a href="#" className="text-sm block">Career</a></li>
            </ul>
          </div>
          <div className="mb-10 w-full sm:w-1/4">
            <h3 className="font-semibold text-xl mb-2">Follow Us</h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a href="#" className="text-white"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#" className="text-white"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-white"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
