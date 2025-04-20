import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductIntroShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const products = [
    {
      id: 'a2-bilona-production',
      name: 'A2 Bilona Ghee - Crafted Purity',
      videoSrc: '/videos/grinding.mp4',
      tagline: 'Handcrafted with Tradition',
      description: 'Witness the art of our A2 Bilona Ghee, made from the milk of free-roaming A2A2 cows using the ancient Bilona method. Each batch is churned by hand to preserve its rich nutrients and authentic flavor.',
      benefits: ['Hand-churned for purity', 'Sourced from A2A2 cow milk', 'Retains natural nutrients']
    },
    {
      id: 'a2-bilona-natural',
      name: 'A2 Bilona Ghee - Nature’s Finest',
      videoSrc: '/videos/vid3.mp4',
      tagline: 'Purely Natural Goodness',
      description: 'Crafted from 100% natural milk of free-roaming A2A2 cows, our ghee is free from additives, delivering wholesome nourishment that supports immunity, digestion, and overall vitality.',
      benefits: ['Boosts immunity', 'Aids digestion', 'No artificial additives']
    },
    {
      id: 'a2-bilona-process',
      name: 'A2 Bilona Ghee - Time-Honored Method',
      videoSrc: '/videos/vid1.mp4',
      tagline: 'The Bilona Legacy',
      description: 'Our ghee is made using the traditional Bilona method, a slow, meticulous process that enhances its nutritional profile, making it a golden elixir for joint health and wellness.',
      benefits: ['Supports joint health', 'Rich in antioxidants', 'Traditionally processed']
    }
  ];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Handle video playback and mute state
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = isMuted;
        if (index === activeIndex) {
          if (videoPlaying) {
            video.play().catch(() => setVideoPlaying(false));
          } else {
            video.pause();
          }
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, videoPlaying, isMuted]);

  const handleVideoToggle = () => {
    setVideoPlaying(!videoPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
    setVideoPlaying(true);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setVideoPlaying(true);
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Video Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* <div className="absolute inset-0 bg-black/50 z-10"></div>  */}
        
        {/* Video backgrounds */}
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0,
              scale: activeIndex === index ? 1 : 1.1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={product.videoSrc}
              className="object-cover w-full h-full"
              loop
              playsInline
              preload="auto" // Optimize video loading
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient overlays - Simplified for mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 w-3/4 sm:w-2/3"></div>

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col">
      

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6">
              {/* Left content */}
              <motion.div
                className="sm:col-span-7"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='bg-black/50 p-6 rounded-[24px]'
                  >
                    <motion.div
                      className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-xs sm:text-sm font-medium mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {products[activeIndex].tagline}
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                      {products[activeIndex].name}
                    </h1>

                    <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-md sm:max-w-xl">
                      {products[activeIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {products[activeIndex].benefits.map((benefit, i) => (
                        <motion.span
                          key={i}
                          className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-white/10 text-white text-xs sm:text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
                          {benefit}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-500 text-black font-medium rounded-full flex items-center text-sm sm:text-base"
                      >
                        Discover More
                        <ArrowRight size={16} className="ml-2" />
                      </motion.button>

                      <motion.button
                        onClick={handleVideoToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                      >
                        {videoPlaying ? (
                          <Pause size={20} className="text-white" />
                        ) : (
                          <Play size={20} className="text-white ml-0.5" />
                        )}
                      </motion.button>

                      <motion.button
                        onClick={handleMuteToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                      >
                        {isMuted ? (
                          <VolumeX size={20} className="text-white" />
                        ) : (
                          <Volume2 size={20} className="text-white" />
                        )}
                      </motion.button>


                      <div className="flex justify-between items-center">
            <motion.div
              className="h-1 w-12 sm:w-16 "
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>

            <nav className="flex items-center space-x-3">
              <motion.button
                onClick={goToPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                aria-label="Previous product"
              >
                <ArrowLeft size={20} className="text-white" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                aria-label="Next product"
              >
                <ArrowRight size={20} className="text-white" />
              </motion.button>
            </nav>
          </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Right content - Product visual hint */}
              <motion.div
                className="sm:col-span-5 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-purple-500/20 blur-xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>

                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 hidden lg:flex items-center justify-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-green-500/20 to-green-300/20 backdrop-blur-sm border border-green-500/30 flex items-center justify-center">
                      <span className="text-lg sm:text-xl font-light text-white/80">
                        {activeIndex + 1}/{products.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductIntroShowcase;