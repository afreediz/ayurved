import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart, cartOperations } from '../../context/cart'
import {toast} from 'react-toastify'

const ProductCard = ({product}) => {
  const context = useCart()
  return (
    // <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    //   <div className="image">
    //     <img src={data.image ? data.image : "https://via.placeholder.com/150"} alt={data.name} className="w-full h-48 object-cover" />
    //   </div>
    //   <div className="p-4">
    //     <div className="title">
    //       <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
    //       <p className="text-gray-600">${data.price}</p>
    //     </div>
    //     <p className="text-gray-600 mt-2">{data.shortdesc}</p>
    //     <div className="buttons flex mt-4">
    //       <Link to={`/products/${data.slug}`} className="w-1/2 text-center py-2 bg-green-600 text-white rounded-l-lg hover:bg-green-700">More details</Link>
    //       <button onClick={() => {
    //         cartOperations.addToCart(data, context);
    //         toast.success('Added to cart');
    //       }} className="w-1/2 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">Add to Cart</button>
    //     </div>
    //   </div>
    // </div>
  <div key={product._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[500px] max-h-[500px]">
    <div className="w-full h-48 mb-4 overflow-hidden rounded flex-shrink-0">
      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
    </div>
    <div className="flex-grow">
      <div className="text-sm text-gray-600 uppercase">{product.category.name}</div>
      <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
      <p className="text-gray-600 mt-2">{product.shortdesc}</p>
      <div className="flex items-center mt-4">
        <div className="text-yellow-500">
          {'★'.repeat(4)}
          {'☆'.repeat(4)}
        </div>
        <div className="text-gray-600 ml-2">44</div>
      </div>
      <div className="text-xl font-bold mt-2">₹{product.price.toFixed(2)}</div>
    </div>
  </div>
  );
}

export default ProductCard
