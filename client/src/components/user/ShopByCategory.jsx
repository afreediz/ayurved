import React from 'react';

const categories = [
  { name: 'Ghee', imageUrl: '/images/category/ghee.jpeg' },
  { name: 'A2 Milk', imageUrl: '/images/category/milk.jpeg' },
  { name: 'Honey', imageUrl: '/images/category/ghee.jpeg' },
  { name: 'Stone-Pressed Oils', imageUrl: '/images/category/milk.jpeg' },
];

const ShopByCategory = () => {
  return (
    <div className="py-10 bg-gray-100 mx-auto max-w-7xl">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-2xl font-bold">Shop By Category</h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto my-4"></div>
      </div>
      <div className="container grid grid-cols-2 md:grid-cols-4">
        {categories.map((category, index) => (
          <div key={index} className="p-4">
            <img src={category.imageUrl} alt={category.name} className="w-full object-contain rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;