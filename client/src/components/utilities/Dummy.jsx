import React from 'react'
import Center from './Center'
import ProductCard from './ProductCard'
const Dummy = ({products}) => {
  return (
    <Center>
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
  )
}

export default Dummy
