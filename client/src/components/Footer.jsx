import React from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-8 px-4">
        <p className="text-xl italic text-center md:hidden">"Reviving Tradition, Nourishing Generations"</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 justify-between container mx-auto">
          <div className="w-full sm:w-auto sm:text-left mb-4 sm:mb-0">
            <div className="text-white text-5xl font-bold">
            NAVJEEVANA
            </div>
            <div className=" mb-4 sm:mb-0">
              <h3 className="font-semibold text-xl mb-2">Helpful Links</h3>
              <ul>
                <li><Link to={"/"} className=" block">Home</Link></li>
                <li><Link to={"/allproducts"} className=" block">All Products</Link></li>
                <li><Link to={"/about-us"} className=" block">About us</Link></li>
                <li><Link to={"/privacy-and-policy"} className=" block underline">Privacy & Policies</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:text-left mb-6">
            <p className="text-2xl italic hidden md:block">"Reviving Tradition, Nourishing Generations"</p>
            <div className=" mb-4 sm:mb-0">
              <h3 className="font-semibold text-2xl mb-2">Connect With Us</h3>
              <ul>
                <li className='flex items-center gap-1 font text-xl text-white'><FaPhone /> +91 94460 27777</li>
                <li className='flex items-center gap-1 font text-xl text-white'><FaPhone /> +971 55 678 4334</li>
                <li className='flex items-center gap-1 font text-xl text-white'><a href="mailto:navjeevana@gmail.com" className=""> fortunegate@navjeevana.com</a></li>
              </ul>
              <ul className='flex gap-4 text-3xl mt-5'>
                <li><a href='https://www.instagram.com/navjeevanakerala/' className=""><FaInstagram className=' text-red-500' /></a></li>
                <li><a href='' className=""><FaFacebook className=' text-blue-500' /></a></li>
                <li><a href='' className=""><FaYoutube className=' text-red-500' /></a></li>
                <li><a href='' className=""><FaTwitter className=' text-blue-500' /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center py-3 bg-white text-black w-full mt-8 text-sm">
          <span className='px-1'>© NAVJEEVANA, FORTUNE GATE ORGANIC FARMING | DESIGNED BY <a href='https://www.linkedin.com/in/Afreediz/' className=' text-blue-400'>AFREEDI</a> </span>
        </div>
    </footer>
  );
};

export default Footer;