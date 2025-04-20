import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';


const ProductCard= ({ product }) => {
  const { baseCurrencyRate, currencySymbol } = useCart();
  
  return (
    <Link to={`/products/${product.slug}`} className="block group relative">
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        {/* Organic Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Organic
        </div>
        
        {/* Premium Indicator */}
        {product.premium && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            Premium
          </div>
        )}
        
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-10 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-115 group-hover:rotate-2"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Category */}
          <div className="text-xs font-medium text-green-600 uppercase tracking-wider mb-2">
            {product.category.name}
          </div>
          
          {/* Product Name */}
          <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {currencySymbol}{(product.price * baseCurrencyRate).toFixed(2)}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-green-500 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;