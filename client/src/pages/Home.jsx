import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
// import FilterSidebar from '../components/utilities/FilterSidebar'
import { toast } from 'react-toastify'
import Slider from '../components/user/Slider'
import HighlightedProducts from '../components/user/Highlighted'
import Center from '../components/utilities/Center'
const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/list/${1}`)
        setProducts(data.products)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getProducts()
  },[])
  return (
    <div className="w-full">
      {/* Full-width section with no padding */}
      <div className="w-full">
        <Slider />
      </div>
      {/* Centered content with padding */}
      <Center>
          <div className="w-full">
            <HighlightedProducts />
          </div>
          
          <div className="w-full">
            <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-300 inline-block pb-2 mb-4">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
              {products && products.length === 0 && <div className="text-gray-700 font-bold text-2xl">No products</div>}
              {products && products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>
       </Center>
    </div>
  );  
  }

export default Home
