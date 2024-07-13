import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image:"https://www.linuscartitsolutions.com/drtrimurthy.com/assets/img/resource/aboutayurveda-banner.jpg",
    link:"https://example.com/slide1",
  },{
    image:"https://yashremedies.com/cdn/shop/files/Banner1_6617d195-69fd-484c-99a9-9eeac21e126a.jpg?v=1692598358",
    link:"https://example.com/slide1",
  },{
    image:"https://www.aimilpharma.life/cdn/shop/articles/blog-banner.jpg?v=1602927357",
    link:"https://example.com/slide1",
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
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-96 flex justify-center items-center">
            <Link to={slide.link}>
              <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
            </Link>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full">‹</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full">›</button>
    </div>
  );
};

export default Slider;
