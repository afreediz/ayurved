import React, {useState, useEffect} from 'react';
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
        setProducts([...data.products]);
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
    <section className="bg-gray-50 py-16">
      <Center>
        <div className="flex justify-between items-center mb-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Our Bestsellers
          </h2>
          <Link
            to="/allproducts"
            className="text-green-600 hover:text-green-700 font-medium text-lg transition-colors duration-300"
          >
            View All
          </Link>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-10">
              <svg
                className="animate-spin h-8 w-8 text-green-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600 py-10">
              No bestsellers available at the moment.
            </p>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={products.length > 3}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
                1280: { slidesPerView: 4, spaceBetween: 40 },
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {!loading && products.length > 0 && (
            <>
              <div className="swiper-button-prev !w-12 !h-12 !bg-white !text-gray-900 !rounded-full shadow-lg hover:!bg-gray-100 transition-all duration-300"></div>
              <div className="swiper-button-next !w-12 !h-12 !bg-white !text-gray-900 !rounded-full shadow-lg hover:!bg-gray-100 transition-all duration-300"></div>
            </>
          )}
        </div>
      </Center>
    </section>
  );
};

export default BestSellers;
