import React, { useEffect, useState } from 'react'
import Center from '../components/utilities/Center'
import API from '../services/api'
import { toast } from 'react-toastify'
import ProductCard from '../components/utilities/ProductCard'

const AllProducts = () => {
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
    <Center>
      <h1>All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {products && products.length === 0 && <div className="text-gray-700 font-bold text-2xl">No products</div>}
        {products && products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </Center>
  )
}

export default AllProducts
