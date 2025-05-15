// import React, { useEffect, useState } from 'react'
// import ProductCard from '../components/utilities/ProductCard'
// import API from '../services/api'
// import FilterSidebar from '../components/utilities/FilterSidebar'
import Slider from '../components/user/Slider'
import HighlightedProducts from '../components/user/Bestsellers'
import Why from '../components/user/Why'
import ProductVideos from '../components/user/ProductVideos'
import ShopBySolution from '../components/user/ShopBySolution'
// import CustomerReview from '../components/user/CustomerReview'
import ExploreMoreProducts from '../components/user/ExploreMoreProducts'
import CTA from '../components/user/cta'
import BilonaCowDetails from '../components/user/bilona-cow-details'
import VisitingCard from '../components/user/visiting-card'


const Home = () => {
  return (
    <div className="w-full relative">
      <img src="/images/why/flowers.png" alt="" className=' absolute opacity-50 brightness-150 left-0 right-0 z-[-1]' />

        <ProductVideos />
        <div className="">
        <Slider />
        <HighlightedProducts />
        <Why />
        <BilonaCowDetails/>
        <ShopBySolution />
        </div>
        <CTA/>
        <VisitingCard/>
        {/* <CustomerReview /> */}
        <ExploreMoreProducts />
      

    </div>
  );  
  }

export default Home
