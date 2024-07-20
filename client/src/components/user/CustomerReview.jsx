import React from 'react';
import Center from '../utilities/Center';

const reviews = [
  {
    name: "Celia Almeda",
    position: "CEO Company",
    image: "https://via.placeholder.com/50", // Placeholder image URL
    quote: "Proin sed libero enim sed faucibus turpis. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Ut sem nulla pharetra diam sit amet nisl."
  },
  {
    name: "Frank Kinney",
    position: "Financial Director",
    image: "https://via.placeholder.com/50", // Placeholder image URL
    quote: "Proin sed libero enim sed faucibus turpis. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Ut sem nulla pharetra diam sit amet nisl."
  }
];

const CustomerReview = () => {
  return (
      <div className="bg-green-100 py-12">
        <Center>
      <h2 className="text-center text-2xl font-semibold mb-8">Read what our customers say</h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">"{review.quote}"</p>
            <div className="flex items-center">
              <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="text-gray-900 font-semibold">{review.name}</h3>
                <p className="text-gray-600">{review.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Center>
    </div>
  );
};

export default CustomerReview;
