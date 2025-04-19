import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../utilities/ProductCard';
import Center from '../utilities/Center';
import { Link } from 'react-router-dom';


const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const { data } = await API.get(`products/highlighted`);
        // Limit to 4 products
        setProducts(data.products.slice(0, 4));
      } catch (error) {
        toast.error(error.response?.data.message || 'Failed to load bestsellers');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 my-16">
      <Center>
        <div className="flex justify-center items-center mb-10 px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sub-heading"
          >
            Our <span className='green-gradient-text'>Best sellers</span>
          </motion.h2>
          {/* <Link
            to="/allproducts"
            className="text-green-500 hover:text-green-600 font-semibold text-lg transition-colors duration-300 flex items-center gap-2"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link> */}
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl shadow-lg p-6 animate-pulse"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 py-10 text-lg"
            >
              No bestsellers available at the moment.
            </motion.p>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={products.length > 1} // Loop only if more than 1 product
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
                1280: { slidesPerView: 4, spaceBetween: 40 },
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {!loading && products.length > 0 && (
            <>
              <div
                className="swiper-button-prev !w-12 !h-12 !bg-green-500 !text-white !rounded-full shadow-lg hover:!bg-green-600 transition-all duration-300 after:!text-xl"
                aria-label="Previous slide"
              ></div>
              <div
                className="swiper-button-next !w-12 !h-12 !bg-green-500 !text-white !rounded-full shadow-lg hover:!bg-green-600 transition-all duration-300 after:!text-xl"
                aria-label="Next slide"
              ></div>
            </>
          )}
        </div>
      </Center>
    </section>
  );
};

export default BestSellers;