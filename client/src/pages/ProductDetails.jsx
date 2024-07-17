import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import {cartOperations, useCart} from '../context/cart'
import {toast} from 'react-toastify'
import Center from '../components/utilities/Center'
const ProductDetails = () => {
  const [product, setProduct] = useState()
  const context = useCart()
  const { slug } = useParams()
  useEffect(()=>{
    async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        setProduct(data.product)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getProduct()
  },[])
  return (
    product?(
<Center>
  <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 '>
    <div className="image col-span-2 flex justify-center items-center">
      <img src={product.image ? product.image :"https://via.placeholder.com/150"}  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
    </div>
    <div className="col-span-4">
      <h2 className="text-4xl font-bold mb-4">{product && product.name}</h2>
      <h3 className="text-2xl font-semibold mb-4">${product && product.price}</h3>
      <h3 className="text-xl mb-4">In stocks : {product && product.quantity > 0 ? product.quantity : "Out of stock"}</h3>
      <p className="text-lg mb-8">{product && product.description}</p>
      <div className="button-container flex gap-4">
        <button className='py-2 px-4 bg-blue-500 font-medium rounded-lg hover:bg-blue-600 transition duration-300'>Buy Now</button>
        <button 
          className='py-2 px-4 bg-green-500 font-medium rounded-lg hover:bg-green-600 transition duration-300'
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
</Center>
    ):"No product found"
  );
}

export default ProductDetails
