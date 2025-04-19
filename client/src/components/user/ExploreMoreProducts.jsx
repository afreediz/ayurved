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

const ExploreMoreProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function getProducts(){
        try{
            const {data} = await API.get(`products/list/${1}`)
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
      <div className="flex justify-center items-center px-4 md:px-10 lg:px-20">
        <h2 className="sub-heading">Explore More <span className='green-gradient-text'>Products</span></h2>
        {/* <Link to={"/allproducts"} className="text-green-600 hover:text-green-800">View All</Link> */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.reverse().map((product,index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
        </div>
      </Swiper>
    </div>
    </Center>
  );
};

export default ExploreMoreProducts;
