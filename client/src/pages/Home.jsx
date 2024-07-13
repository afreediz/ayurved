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
        <Slider />
        <HighlightedProducts />
        <Why />
        <Dummy products={products} />
    </div>
  );  
  }

export default Home
