import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
// import FilterSidebar from '../components/utilities/FilterSidebar'
import { toast } from 'react-toastify'
import Slider from '../components/user/Slider'
import HighlightedProducts from '../components/user/Bestsellers'
import Why from '../components/user/Why'
import ProductVideos from '../components/user/ProductVideos'
import ShopBySolution from '../components/user/ShopBySolution'
import CustomerReview from '../components/user/CustomerReview'
import ExploreMoreProducts from '../components/user/ExploreMoreProducts'
const Home = () => {
  return (
    <div className="w-full relative">
      <img src="/images/why/flowers.png" alt="" className=' absolute opacity-50 brightness-150 left-0 right-0 z-[-1]' />

        <Slider />
        <HighlightedProducts />
        <ProductVideos />
        <Why />
        <ShopBySolution />
        <CustomerReview />
        <ExploreMoreProducts />
    </div>
  );  
  }

export default Home
