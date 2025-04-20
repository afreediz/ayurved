import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function getSlides() {
      try {
        const { data } = await API.get('/slider');
        const fallbackSlides = [
          {
            id: 1,
            image: "/images/organic-ghee.jpg",
            url: "/allproducts",
            title: "Pure Organic Ghee",
            subtitle: "Crafted with care from native cows"
          },
          {
            id: 2,
            image: "/images/village-farm.jpg",
            url: "/about-us",
            title: "From Our Farms",
            subtitle: "Straight from the village to your home"
          },
          {
            id: 3,
            image: "/images/wellness-lifestyle.jpg",
            url: "/categories",
            title: "Holistic Living",
            subtitle: "Nourish your body and soul naturally"
          }
        ];
        setSlides(data.sliders?.length ? data.sliders : fallbackSlides);
      } catch (err) {
        console.error("Error fetching slides", err);
      }
    }
    getSlides();
  }, []);

  return (
    <section className="bg-[#fefcf9] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#3d2c1e] mb-12 leading-tight">
          Experience Pure Wellness from Nature’s Best
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slides.map((slide, index) => (
            <Link to={slide.url} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition duration-300" />
                <div className="absolute bottom-6 left-6 z-10 text-white">
                  <h3 className="text-2xl font-semibold drop-shadow">{slide.title}</h3>
                  <p className="text-sm mt-1 drop-shadow">{slide.subtitle}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-4 right-4 text-white text-sm bg-green-700/70 px-3 py-1 rounded-full shadow backdrop-blur-sm hidden group-hover:block"
                >
                  Explore
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
