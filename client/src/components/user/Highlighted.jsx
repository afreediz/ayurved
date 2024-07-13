import React, {useState, useEffect} from 'react';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BestSellers = () => {
    const [products, setProducts] = useState([])
    console.log(products);
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
    <div className=" py-10">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold">Our Bestsellers</h2>
        <a href="#" className="text-green-600 hover:text-green-800">View All</a>
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
        modules={[Navigation]}
        className="mySwiper px-4 md:px-10 lg:px-20 mt-8"
      >
        {products.map((product,index) => (
          <SwiperSlide key={index}>
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[500px] max-h-[500px]">
              <div className="w-full h-48 mb-4 overflow-hidden rounded">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-sm text-gray-600 uppercase">{product.category.name}</div>
            <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.shortdesc    }</p>
            <div className="flex items-center mt-4">
                <div className="text-yellow-500">
                {'★'.repeat(4)}
                {'☆'.repeat(4)}
                </div>
                <div className="text-gray-600 ml-2">(44)</div>
            </div>
            <div className="text-xl font-bold mt-2">₹{product.price.toFixed(2)}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


// const BestSellers = () => {
//     return (
//     <div className=" py-10">
//         <div className="flex justify-between items-center px-4 md:px-10 lg:px-20">
//         <h2 className="text-3xl font-bold">Our Bestsellers</h2>
//         <a href="#" className="text-orange-600 hover:text-orange-800">View All</a>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 lg:px-20 mt-8">
//         {products.map((product) => (
//             <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="w-full h-48 mb-4 overflow-hidden rounded">
//                 <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
//             </div>
//             <div className="text-sm text-gray-600 uppercase">{product.category.name}</div>
//             <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
//             <p className="text-gray-600 mt-2">{product.description}</p>
//             <div className="flex items-center mt-4">
//                 <div className="text-yellow-500">
//                 {'★'.repeat(4)}
//                 {'☆'.repeat(4)}
//                 </div>
//                 <div className="text-gray-600 ml-2">(44)</div>
//             </div>
//             <div className="text-xl font-bold mt-2">₹{product.price.toFixed(2)}</div>
//             </div>
//         ))}
//         </div>
//     </div>
//     );
// };

export default BestSellers;
