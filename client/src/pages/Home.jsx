import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
// import FilterSidebar from '../components/utilities/FilterSidebar'
import { toast } from 'react-toastify'
import Slider from '../components/user/Slider'
import HighlightedProducts from '../components/user/Bestsellers'
import Center from '../components/utilities/Center'
import Dummy from '../components/utilities/Dummy'
import Why from '../components/user/Why'
import ProductVideos from '../components/user/ProductVideos'
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
    <div className="w-full relative">
      <img src="/images/why/flowers.png" alt="" className=' absolute opacity-50 brightness-150 left-0 right-0 z-[-1]' />

        <Slider />
        <HighlightedProducts />
        <ProductVideos />
        <Why />
        shop by category <br />
        seasonal or special
        what do our customers say
        explore more
        our incredients

        <Dummy products={products} />

    </div>
  );  
  }

export default Home
