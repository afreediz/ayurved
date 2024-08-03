import React from 'react';
import Center from '../utilities/Center';

const reviews = [
  {
    name: "Celia Almeda",
    position: "CEO Company",
    image: "/images/review/person1.jpg", // Placeholder image URL
    quote: "I recently purchased ghee from this store, and I am absolutely thrilled with the quality. The rich aroma and smooth texture are indicators of its purity. I use it in my cooking daily, and it adds such a wonderful flavor to my dishes. My family has noticed the difference too, and we're all loving it. Highly recommend to anyone looking for authentic, pure ghee!"
  },
  {
    name: "Frank Kinney",
    position: "Financial Director",
    image: "/images/review/person2.jpg", // Placeholder image URL
    quote: "The milk from this store is hands down the best I've ever tasted. It's so fresh and creamy, reminding me of the milk I used to drink during my childhood on my grandparents' farm. My kids love it too, and it's become a staple in our household. Knowing that it's pure and free from any additives makes it even better. I'll definitely be a returning customer!"
  }
];

const CustomerReview = () => {
  return (
      <div className="bg-green-100 py-12">
        <Center>
      <h2 className="text-center text-2xl font-semibold mb-8">Read what our customers say</h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {reviews.map((review, index) => (
          <div data-aos="fade-up" key={index} className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">"{review.quote}"</p>
            <div className="flex items-center">
              <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full mr-4" />
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
