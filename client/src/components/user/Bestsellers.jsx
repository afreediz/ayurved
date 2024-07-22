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
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function getProducts(){
        try{
            const {data} = await API.get(`products/highlighted`)
            setProducts([
            ...data.products
            ])
        }catch(error){
            toast.error(error.response?.data.message)
            console.log(error)
        }
        }
        getProducts()
    },[])
  return (
    <Center>
    <div className=" py-10">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-medium">Our Bestsellers</h2>
        <Link to={"/allproducts"} className="text-green-600 hover:text-green-800">View All</Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper px-4 md:px-10 lg:px-20 mt-8"
      >
        {products.map((product,index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </Center>
  );
};

export default BestSellers;
