import React, { useState } from "react";
import { Link } from "react-router-dom";
import Center from "../utilities/Center";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Immunity Power",
    imageUrl: "/images/solution/immunity.jpg",
    description: "Boost your natural defense system",
    detail: "Advanced formulations designed to strengthen immune response and provide comprehensive protection against environmental challenges."
  },
  {
    name: "Best for Health",
    imageUrl: "/images/solution/health.jpg",
    description: "Enhance your overall wellbeing",
    detail: "Scientifically-backed solutions that promote optimal health and vitality through balanced nutrition and targeted supplementation."
  },
  {
    name: "Digestive Issues",
    imageUrl: "/images/solution/digestion.jpg",
    description: "Support your digestive health",
    detail: "Specialized products crafted to improve gut health, enhance nutrient absorption, and restore digestive balance naturally."
  },
  {
    name: "Best for Children",
    imageUrl: "/images/solution/children.webp",
    description: "Specially formulated for growing kids",
    detail: "Gentle, effective formulations carefully developed to support children's development, immunity, and overall health."
  },
];

const ShopBySolution = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredCategory, setFeaturedCategory] = useState(0);

  const handleCategorySelect = (index) => {
    setSelectedCategory(index === selectedCategory ? null : index);
  };

  return (
    <Center>
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Elegant Header with Animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide uppercase">
            Exclusive <span className="font-semibold">Wellness</span> Solutions
          </h2>
          <motion.div 
            className="w-16 h-px bg-gray-400 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
          <motion.p 
            className="mt-6 text-base text-gray-600 max-w-xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Meticulously crafted premium formulations for discerning health
            enthusiasts
          </motion.p>
        </motion.div>

        {/* Main Category Showcase with Framer Motion */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-12"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden ${
                selectedCategory === index ? "col-span-2 row-span-2 z-10" : ""
              }`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCategorySelect(index)}
              layoutId={`category-container-${index}`}
            >
              <motion.div
                className="aspect-square cursor-pointer"
                whileHover={{ scale: selectedCategory === index ? 1 : 1.05 }}
                transition={{ duration: 0.4 }}
              >
                {/* Image with Overlay */}
                <motion.div className="absolute inset-0">
                  <motion.img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    layoutId={`category-image-${index}`}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{ 
                      opacity: hoveredIndex === index || selectedCategory === index ? 0.5 : 0.3 
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.div>

                {/* Content Container */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  layoutId={`category-content-${index}`}
                >
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm p-6 text-center max-w-xs"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.h3 
                      className="text-xl font-light tracking-wide uppercase text-gray-900 mb-2"
                      layoutId={`category-title-${index}`}
                    >
                      {category.name}
                    </motion.h3>
                    <AnimatePresence>
                      {(hoveredIndex === index || selectedCategory === index) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            className="w-12 h-px bg-gray-400 mx-auto mb-3"
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 0.4 }}
                          ></motion.div>
                          <motion.p 
                            className="text-sm text-gray-700 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            {selectedCategory === index
                              ? category.detail
                              : category.description}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <Link
                              to="/allproducts"
                              className="inline-block border border-gray-900 text-gray-900 py-2 px-4 text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors duration-300"
                            >
                              Discover
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

       
     
        
      </motion.section>
    </Center>
  );
};

export default ShopBySolution;