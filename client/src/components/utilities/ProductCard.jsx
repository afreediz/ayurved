import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cart';

const ProductCard = ({product}) => {
  const {baseCurrencyRate, currencySymbol} = useCart()
  return (
    <Link to={`/products/${product.slug}`}>
  <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[450px] max-h-[450px]">
    <div className="w-full h-48 mb-4 overflow-hidden rounded flex-shrink-0 flex justify-center items-center">
      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
    </div>
    <div className="flex-grow p-6">
      <div className="text-sm text-gray-600 uppercase">{product.category.name}</div>
      <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
      <p className="text-gray-600 mt-2">{product.shortdesc}</p>
      <div className="flex items-center mt-2">
        <div className="text-yellow-500">
          {'★'.repeat(5)}
        </div>
      </div>
      <div className="text-xl font-bold mt-2">{currencySymbol} {product.price.toFixed(2)*baseCurrencyRate}</div>
    </div>
  </div>
    </Link>
  );
}

export default ProductCard
