import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image:"/images/gheequality.jpeg",
    link:"/allproducts",
  },  {
    image:"/images/cows.jpeg",
    link:"/allproducts",
  },{
    image:"/images/newimg.jpeg",
    link:"/allproducts",
  }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className=" min-w-full" style={{height:"70vh"}}>
            <Link to={slide.link}>
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-fill"
              />
            </Link>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 p-3 font-bold rounded-full">‹</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 p-3 font-bold rounded-full">›</button>
    </div>
  );
};


// const Slider = () => {
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const slides = document.querySelectorAll('.slide');
//       const currentSlide = document.querySelector('.current');
//       currentSlide.classList.remove('current');
//       if (currentSlide.nextElementSibling) {
//         currentSlide.nextElementSibling.classList.add('current');
//       } else {
//         slides[0].classList.add('current');
//       }
//     }, 5000); // 5 seconds interval for autosliding

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <div className="slide current absolute w-full h-full">
//         <picture>
//           <source
//             srcSet="/path-to-desktop-image1.jpg"
//             media="(min-width: 1024px)"
//           />
//           <source srcSet="/path-to-mobile-image1.jpg" media="(max-width: 1023px)" />
//           <img
//             src="/path-to-desktop-image1.jpg"
//             alt="Slide 1"
//             className="w-full h-full object-cover"
//           />
//         </picture>
//       </div>
//       <div className="slide absolute w-full h-full">
//         <picture>
//           <source
//             srcSet="/path-to-desktop-image2.jpg"
//             media="(min-width: 1024px)"
//           />
//           <source srcSet="/path-to-mobile-image2.jpg" media="(max-width: 1023px)" />
//           <img
//             src="/path-to-desktop-image2.jpg"
//             alt="Slide 2"
//             className="w-full h-full object-cover"
//           />
//         </picture>
//       </div>
//       <div className="slide absolute w-full h-full">
//         <picture>
//           <source
//             srcSet="/path-to-desktop-image3.jpg"
//             media="(min-width: 1024px)"
//           />
//           <source srcSet="/path-to-mobile-image3.jpg" media="(max-width: 1023px)" />
//           <img
//             src="/path-to-desktop-image3.jpg"
//             alt="Slide 3"
//             className="w-full h-full object-cover"
//           />
//         </picture>
//       </div>
//     </div>
//   );
// };

export default Slider;
