import React from 'react';
import Center from '../utilities/Center';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Immunity Power', imageUrl: '/images/solution/immunity.jpg' },
  { name: 'Best for Health', imageUrl: '/images/solution/health.jpg' },
  { name: 'Digestive issues', imageUrl: '/images/solution/digestion.jpg' },
  { name: 'Best for childrens', imageUrl: '/images/solution/children.webp' },
];

const ShopBySolution = () => {
  return (
    <Center>
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-2xl font-bold">Shop By Solutions</h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto my-4"></div>
      </div>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-1">
        {categories.map((category, index) => (
          <Link to="/allproducts">
          <div key={index} className="p-4">
            <div className="w-full h-72 overflow-hidden bg-gray-300">
              <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover rounded-lg mb-4 object-center" />
            </div>
            <h3 className="text-lg font-semibold text-center">{category.name}</h3>
          </div>
          </Link>
        ))}
      </div>
    </Center>
  );
};

export default ShopBySolution;