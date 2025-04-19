import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';

const ProductCard = ({ product }) => {
  const { baseCurrencyRate, currencySymbol } = useCart();

  return (
    <Link to={`/products/${product.slug}`} className="block group">
      <div className="relative bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden  mx-auto">
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Premium Ghee
        </div>

        {/* Product Image with Zoom Effect */}
        <div className="relative w-full h-60 overflow-hidden rounded-t-2xl flex justify-center items-center bg-white/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-3/4 h-3/4 object-contain transform group-hover:scale-110 transition-transform duration-700"
          />
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
        <div className="h-52">
            {/* Category */}
            <div className="text-xs font-medium text-green-600 uppercase tracking-wide">
            {product.category.name}
          </div>

          {/* Product Name */}
          <h3 className="text-xl font-serif font-semibold text-gray-800 mt-2 group-hover:text-green-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {product.shortdesc}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            <div className="text-green-500 flex">
              {'★'.repeat(5)}
            </div>
            <span className="ml-2 text-xs text-gray-500">(4.8/5)</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-900 mt-4">
            {currencySymbol} {(product.price * baseCurrencyRate).toFixed(2)}
          </div>
        </div>

          {/* Call to Action Button */}
          <button
            className="mt-4 w-full bg-green-500 text-white text-sm font-medium py-3 rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 "
            onClick={(e) => e.preventDefault()} // Prevent Link navigation for demo
          >
            Add to Cart
          </button>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200/30 rounded-tl-full transform translate-x-12 translate-y-12"></div>
      </div>
    </Link>
  );
};

export default ProductCard;