import React from 'react';
import { Link } from 'react-router-dom';
import Center from '../utilities/Center';

const categories = [
  { 
    name: 'Immunity Power', 
    imageUrl: '/images/solution/immunity.jpg',
    description: 'Boost your natural defense system'
  },
  { 
    name: 'Best for Health', 
    imageUrl: '/images/solution/health.jpg',
    description: 'Enhance your overall wellbeing'
  },
  { 
    name: 'Digestive Issues', 
    imageUrl: '/images/solution/digestion.jpg',
    description: 'Support your digestive health'
  },
  { 
    name: 'Best for Children', 
    imageUrl: '/images/solution/children.webp',
    description: 'Specially formulated for growing kids'
  },
];

const ShopBySolution = () => {
  return (
    <Center>
      <section className="">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Your Wellness Solutions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of health solutions tailored to your needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/allproducts"
              className="group relative block bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                <span className="inline-block mt-4 text-sm font-medium text-orange-600 group-hover:text-orange-700">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Center>
  );
};

export default ShopBySolution;