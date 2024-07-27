import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import {cartOperations, useCart} from '../context/cart'
import {toast} from 'react-toastify'
import Center from '../components/utilities/Center'
import Loader from '../components/Loader'
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../components/utilities/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation, Autoplay } from 'swiper/modules';

const ProductDetails = () => {
  const [product, setProduct] = useState()
  const [relatedProd, setRelatedProd] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const context = useCart()
  const { slug } = useParams()
  useEffect(()=>{
    window.scrollTo(0, 0)
    async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        setProduct(data.product)
        const d = await API.get(`products/related-products/${data.product._id}/${data.product.category._id}`)
        setRelatedProd(d.data.products)
        setLoading(false)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getProduct()
  },[])
  return (
    product?(
<Center className=" my-10">
  <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 '>
    <div className="image col-span-2 flex justify-center items-center">
      <img src={product.image ? product.image :"https://via.placeholder.com/150"}  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
    </div>
    <div className="col-span-4">
      <h2 className="text-4xl font-bold mb-4">{product && product.name}</h2>
      <h3 className="text-2xl font-semibold mb-4">${product && product.price}</h3>
      {product && product.quantity > 0 ?<h3 className="text-xl mb-4">In stocks :  {product.quantity}  </h3>:
      <span className='text-red-500 text-2xl'>Out of Stocks</span>}
      <p className="text-lg mb-8">{product && product.description}</p>
      <div className="button-container flex gap-4">
      <button 
          disabled={product.quantity === 0}
          className={`py-2 px-4 ${product.quantity === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'}  font-medium rounded-lg transition duration-300 text-white`}
          onClick={() => {
            cartOperations.addToCart(
              { _id: product._id, name: product.name, price: product.price, shortdesc: product.shortdesc, image: product.image },
              context
            );
            navigate('/cart')
          }}
        >
          Buy Now
        </button>
        <button 
          disabled={product.quantity === 0}
          className={`py-2 px-4 ${product.quantity === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 cursor-pointer'}  font-medium rounded-lg transition duration-300 text-white`}
          onClick={() => {
            cartOperations.addToCart(
              { _id: product._id, name: product.name, price: product.price, shortdesc: product.shortdesc, image: product.image },
              context
            );
            toast.success('Added to cart');
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
  {product && <div className='text-xl' dangerouslySetInnerHTML={{ __html: product.contents }}></div>}
  {relatedProd?.length > 0 &&  <Center>
    <div className=" py-10">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold">Explore More Products</h2>
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
        {relatedProd && relatedProd.map((product,index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </Center>}
  {/* <img src="/images/why/flowers.png" alt="" className=' absolute opacity-50 brightness-150 left-0 right-0 z-[-1] w-full' /> */}
  <div className="absolute inset-0 bg-cover bg-center opacity-50 brightness-150 z-[-1]" style={{ backgroundImage: "url('/images/why/flowers.png')" }}></div>
  {loading && <Loader />}
</Center>
    ):"No product found"
  );
}

export default ProductDetails
