import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaYoutube, FaEnvelope, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const [hoverEffect, setHoverEffect] = useState(null);
  const [emailFocus, setEmailFocus] = useState(false);
  
  const socialLinks = [
    { icon: <FaInstagram />, color: 'hover:text-pink-500', url: 'https://www.instagram.com/navjeevanakerala/', label: 'Instagram' },
    { icon: <FaFacebook />, color: 'hover:text-blue-500', url: '#', label: 'Facebook' },
    { icon: <FaYoutube />, color: 'hover:text-red-500', url: '#', label: 'YouTube' },
    { icon: <FaTwitter />, color: 'hover:text-blue-400', url: '#', label: 'Twitter' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 1.5 } }
  };

  const socialIconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { type: 'spring', stiffness: 500 } }
  };

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { type: 'spring', stiffness: 300 } }
  };

  const dotVariants = {
    initial: { width: 8 },
    hover: { width: 12, transition: { type: 'spring', stiffness: 300 } }
  };

  const wavePathVariants = {
    initial: { d: "M0,0 C480,48 960,48 1440,0 L1440,0 L0,0 Z" },
    animate: {
      d: "M0,0 C360,30 1080,30 1440,0 L1440,0 L0,0 Z",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 10,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-gray-100">
      {/* Top curved separator with animation */}
      <div className="w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="fill-white w-full">
          <motion.path
            initial="initial"
            animate="animate"
            variants={wavePathVariants}
          />
        </svg>
      </div>
      
      {/* Main footer content */}
      <motion.div 
        className="container mx-auto px-6 pt-8 pb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Logo & Tagline Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-2"
            initial="initial"
            whileHover="hover"
            variants={logoVariants}
          >
            <motion.div
              animate={{
                rotateZ: [0, 10, -10, 0],
                transition: { repeat: Infinity, duration: 4 }
              }}
            >
              <FaLeaf className="text-green-400 text-3xl" />
            </motion.div>
            <h1 className="text-5xl font-extrabold tracking-wider text-white">
              NAVJEEVANA
            </h1>
          </motion.div>
          <motion.p 
            className="mt-4 text-xl italic font-light text-green-200 border-b-2 border-green-700 pb-3 max-w-md"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%", transition: { delay: 0.5, duration: 1.5 } }}
            viewport={{ once: true }}
          >
            "Reviving Tradition, Nourishing Generations"
          </motion.p>
        </motion.div>
        
        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-8">
          {/* About Us */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-bold text-xl mb-6 uppercase text-green-200 border-l-4 border-green-400 pl-3"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              About Us
            </motion.h3>
            <motion.p 
              className="text-sm leading-relaxed text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
              viewport={{ once: true }}
            >
              Navjeevana by Fortune Gate Organic Farming delivers premium organic products that honor tradition 
              while embracing sustainable practices for a healthier tomorrow.
            </motion.p>
          </motion.div>
          
          {/* Helpful Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-bold text-xl mb-6 uppercase text-green-200 border-l-4 border-green-400 pl-3"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Helpful Links
            </motion.h3>
            <ul className="space-y-3">
              {['Home', 'All Products', 'About us', 'Privacy & Policies'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center"
                    onMouseEnter={() => setHoverEffect(item)}
                    onMouseLeave={() => setHoverEffect(null)}
                  >
                    <motion.div
                      initial="initial"
                      animate={hoverEffect === item ? "hover" : "initial"}
                      variants={dotVariants}
                    >
                      <span className="inline-block h-2 bg-green-400 rounded-full mr-2" />
                    </motion.div>
                    <motion.span
                      initial="initial"
                      animate={hoverEffect === item ? "hover" : "initial"}
                      variants={linkVariants}
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-bold text-xl mb-6 uppercase text-green-200 border-l-4 border-green-400 pl-3"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Contact Info
            </motion.h3>
            <ul className="space-y-4">
              {[
                { icon: <FaPhone className="text-green-400" />, text: "+91 94460 27777" },
                { icon: <FaPhone className="text-green-400" />, text: "+971 55 678 4334" },
                { 
                  icon: <FaEnvelope className="text-green-400" />, 
                  text: "fortunegate@navjeevana.com",
                  isLink: true,
                  href: "mailto:fortunegate@navjeevana.com"
                }
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.div>
                  {item.isLink ? (
                    <a href={item.href} className="hover:text-white transition-colors duration-300">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter & Social */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="font-bold text-xl mb-6 uppercase text-green-200 border-l-4 border-green-400 pl-3"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Stay Connected
            </motion.h3>
            <div className="mb-6">
              <motion.form 
                className="flex"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={emailFocus ? { scale: 1.02 } : { scale: 1 }}
                  className="w-full"
                >
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-4 py-2 w-full rounded-l bg-green-800 border border-green-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                </motion.div>
                <motion.button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-500 transition-colors duration-300 rounded-r h-11 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </motion.form>
              <motion.p 
                className="text-xs mt-2 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.3 } }}
                viewport={{ once: true }}
              >
                Subscribe for exclusive offers & updates
              </motion.p>
            </div>
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.4 } }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.url}
                    aria-label={social.label}
                    className={`text-2xl p-2 rounded-full bg-green-800 hover:bg-green-700 transition-all duration-300 ${social.color}`}
                    initial="initial"
                    whileHover="hover"
                    variants={socialIconVariants}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Copyright bar */}
      <motion.div 
        className="bg-white py-4 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
          <p>© 2025 NAVJEEVANA, FORTUNE GATE ORGANIC FARMING</p>
          <p className="mt-2 md:mt-0">
            DESIGNED AND DEVELOPED BY{" "}
            <motion.a 
              href="https://www.linkedin.com/in/Afreedi/" 
              className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              AFREEDI
            </motion.a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;