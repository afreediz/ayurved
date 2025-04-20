import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { FaChevronRight, FaChevronLeft, FaLeaf } from 'react-icons/fa';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef(null);
  
  // For parallax scrolling effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  
  // Progress indicators
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  // Handle slide transition
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = slides.length - 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    async function getSlides() {
      try {
        setLoading(true);
        const { data } = await API.get('/slider');
        
        // Adding fallback slides if API doesn't return data
        if (!data.sliders || data.sliders.length === 0) {
          setSlides([
            {
              id: 1,
              image: "/images/organic-products.jpg",
              url: "/allproducts",
              title: "Premium Organic Products",
              subtitle: "Sustainably sourced from traditional farms"
            },
            {
              id: 2,
              image: "/images/traditional-farming.jpg",
              url: "/about-us",
              title: "Traditional Farming Methods",
              subtitle: "Connecting ancestral wisdom with modern nutrition"
            },
            {
              id: 3,
              image: "/images/wellness-journey.jpg",
              url: "/categories",
              title: "Begin Your Wellness Journey",
              subtitle: "Natural products for a healthier lifestyle"
            }
          ]);
        } else {
          // Enhance API data with additional properties if they don't exist
          const enhancedSlides = data.sliders.map(slide => ({
            ...slide,
            title: slide.title || "Navjeevana Organic Products",
            subtitle: slide.subtitle || "Reviving tradition, nourishing generations"
          }));
          setSlides(enhancedSlides);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slides:", error);
        setLoading(false);
        // Set fallback slides
        setSlides([
          {
            id: 1,
            image: "/images/organic-products.jpg",
            url: "/allproducts",
            title: "Premium Organic Products",
            subtitle: "Sustainably sourced from traditional farms"
          },
          {
            id: 2,
            image: "/images/traditional-farming.jpg",
            url: "/about-us",
            title: "Traditional Farming Methods",
            subtitle: "Connecting ancestral wisdom with modern nutrition"
          }
        ]);
      }
    }

    getSlides();
  }, []);

  // Auto-advance slides and handle progress bar
  useEffect(() => {
    if (slides.length === 0) return;
    
    // Reset progress when slide changes
    setProgress(0);
    
    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    // Create progress animation interval
    const duration = 5000; // 5 seconds per slide
    const increment = 100 / (duration / 50); // Update every 50ms
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          paginate(1); // Move to next slide when progress completes
          return 0;
        }
        return prev + increment;
      });
    }, 50);
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, slides.length]);

  // Variants for framer-motion animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        damping: 20
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-100">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-green-600 text-4xl"
        >
          <FaLeaf />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={sliderRef}
      className="relative w-full overflow-hidden"
      style={{ height: "90vh" }}
    >
      {/* Main Slider */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full"
          style={{ zIndex: 1 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-20"
            style={{ zIndex: 2 }}
          />
          
          <motion.img
            src={slides[currentIndex]?.image}
            alt={`Hero ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ y }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
          />
          
          {/* Content Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 md:p-8 text-center"
            style={{ zIndex: 3 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-center mb-3"
              >
                <div className="h-px bg-white opacity-70 w-12 mr-4"></div>
                <span className="uppercase tracking-widest text-sm font-light">Navjeevana</span>
                <div className="h-px bg-white opacity-70 w-12 ml-4"></div>
              </motion.div>
              
              <motion.h1
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              >
                {slides[currentIndex]?.title}
              </motion.h1>
              
              <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              >
                {slides[currentIndex]?.subtitle}
              </motion.p>
              
              <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link to={slides[currentIndex]?.url || "/allproducts"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 font-medium tracking-wide"
                  >
                    Explore Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-75 w-12 h-12 flex items-center justify-center rounded-full z-10 text-green-800 shadow-lg"
        style={{ zIndex: 4 }}
      >
        <FaChevronLeft className="text-xl" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-75 w-12 h-12 flex items-center justify-center rounded-full z-10 text-green-800 shadow-lg"
        style={{ zIndex: 4 }}
      >
        <FaChevronRight className="text-xl" />
      </motion.button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10" style={{ zIndex: 4 }}>
        {slides.map((_, index) => (
          <div
            key={index}
            className="relative h-1 bg-white bg-opacity-30 rounded-full overflow-hidden cursor-pointer w-16"
            onClick={() => setCurrentIndex(index)}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: index === currentIndex ? `${progress}%` : "0%"
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 3 }}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="fill-white w-full">
          <motion.path 
            d="M0,64 C288,96 576,112 1440,64 L1440,120 L0,120 Z"
            initial={{ d: "M0,120 C320,120 960,120 1440,120 L1440,120 L0,120 Z" }}
            animate={{ d: "M0,64 C288,96 576,112 1440,64 L1440,120 L0,120 Z" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default Hero;