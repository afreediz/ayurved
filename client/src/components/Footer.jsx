import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <p className="text-xl italic text-center md:hidden">"Reviving Tradition, Nourishing Generations"</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 justify-between items-center container mx-auto">
          <div className="w-full sm:w-auto sm:text-left mb-4 sm:mb-0">
            <div className="text-white text-4xl font-bold">
            NAVJEEVANA
            </div>
            <div className=" mb-4 sm:mb-0">
              <h3 className="font-semibold text-xl mb-2">Helpful Links</h3>
              <ul>
                <li><Link to={"/"} className="text-sm block">Home</Link></li>
                <li><Link to={"/allproducts"} className="text-sm block">All Products</Link></li>
                <li><Link to={"/about-us"} className="text-sm block">Our Story</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:text-left mb-6">
            <p className="text-2xl italic hidden md:block">"Reviving Tradition, Nourishing Generations"</p>
            <div className=" mb-4 sm:mb-0">
              <h3 className="font-semibold text-2xl mb-2">Connect With Us</h3>
              <ul className='flex gap-4 text-3xl'>
                <li><a href='' className=""><FaInstagram className=' text-red-500' /></a></li>
                <li><a href='' className=""><FaFacebook className=' text-blue-500' /></a></li>
                <li><a href='' className=""><FaYoutube className=' text-red-500' /></a></li>
                <li><a href='' className=""><FaTwitter className=' text-blue-500' /></a></li>
              </ul>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
