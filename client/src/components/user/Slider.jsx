import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function getSlides() {
      try {
        const { data } = await API.get('/slider');
        console.log("slider",data)
        const fallbackSlides = [
          {
            id: 1,
            image: '/images/organic-ghee.jpg',
            url: '/allproducts',
            title: 'Pure Organic Ghee',
            subtitle: 'Crafted with care from native cows',
          },
          {
            id: 2,
            image: '/images/village-farm.jpg',
            url: '/about-us',
            title: 'From Our Farms',
            subtitle: 'Straight from the village to your home',
          },
          {
            id: 3,
            image: '/images/wellness-lifestyle.jpg',
            url: '/categories',
            title: 'Holistic Living',
            subtitle: 'Nourish your body and soul naturally',
          },
        ];
        setSlides(data.sliders?.length ? data.sliders : fallbackSlides);
      } catch (err) {
        console.error('Error fetching slides', err);
      }
    }
    getSlides();
  }, []);

  return (
<div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Heading Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <h2 className="sub-heading text-3xl sm:text-4xl font-bold">
        Experience Pure <span className="text-green-600">Wellness</span> from <span className="text-green-600"> <br />Nature’s</span> Best
      </h2>
      <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        " Sustainable Immunity can only be, on natural food. "
      </p>
    </motion.div>

    {/* Swiper + Video Side by Side */}
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Left: Swiper (3/4) */}
      <div className="w-full lg:w-3/4">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={slides.length > 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet bg-green-500/50',
            bulletActiveClass: 'swiper-pagination-bullet-active bg-green-500',
          }}
          className="relative"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link to={slide.url} className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[400px] sm:h-[500px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-sm sm:text-lg mt-2 drop-shadow-md max-w-md"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-4 inline-block bg-green-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg"
                    >
                      Explore Now
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !w-12 !h-12 !bg-green-500/80 !text-white !rounded-full shadow-lg hover:!bg-green-600 transition-all duration-300 after:!text-xl backdrop-blur-sm" aria-label="Previous slide"></div>
          <div className="swiper-button-next !w-12 !h-12 !bg-green-500/80 !text-white !rounded-full shadow-lg hover:!bg-green-600 transition-all duration-300 after:!text-xl backdrop-blur-sm" aria-label="Next slide"></div>
          <div className="swiper-pagination mt-6" />
        </Swiper>
      </div>

      {/* Right: Video (1/4) */}
      <div className="w-full lg:w-1/4 flex justify-center">
        <video
          src="/videos/grinding.mp4"
          autoPlay
          muted
          loop
          controls
          className="rounded-xl shadow-lg w-full h-auto max-w-xs"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default Hero;