import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Immunity Power",
    icon: Shield,
    description: "Boost your natural defense system with advanced formulations",
    detail: "Advanced formulations designed to strengthen immune response and provide comprehensive protection against environmental challenges through scientifically-backed ingredients.",
    bgPattern: "immunity"
  },
  {
    name: "Best for Health",
    icon: Heart,
    description: "Enhance your overall wellbeing with targeted solutions",
    detail: "Scientifically-backed solutions that promote optimal health and vitality through balanced nutrition and targeted supplementation for comprehensive wellness.",
    bgPattern: "health"
  },
  {
    name: "Digestive Issues",
    icon: Zap,
    description: "Support your digestive health naturally and effectively",
    detail: "Specialized products crafted to improve gut health, enhance nutrient absorption, and restore digestive balance through natural, proven ingredients.",
    bgPattern: "digestion"
  },
  {
    name: "Best for Children",
    icon: Users,
    description: "Specially formulated for growing kids' unique needs",
    detail: "Gentle, effective formulations carefully developed to support children's development, immunity, and overall health with pediatrician-approved ingredients.",
    bgPattern: "children"
  },
];

const ShopBySolution = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const PatternBackground = ({ pattern, isActive }) => {
    const patterns = {
      immunity: (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      ),
      health: (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-full"></div>
        </div>
      ),
      digestion: (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          <div className="absolute inset-6 border border-white/20 rounded-full"></div>
        </div>
      ),
      children: (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-white/20 rounded-full"
              style={{
                left: `${(i * 12) % 100}%`,
                top: `${Math.floor(i / 4) * 50 + 20}%`,
              }}
            />
          ))}
        </div>
      ),
    };
    return patterns[pattern] || null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.section 
        className="py-16 my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            Professional <span className="">Wellness Solutions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of scientifically-backed health products designed for optimal wellness
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-6"></div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-xl h-80 bg-gradient-to-br ${
                    isHovered ? "from-green-600 to-green-700" : "from-green-500 to-green-600"
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                  animate={{
                    boxShadow: isHovered 
                      ? "0 20px 40px rgba(34, 197, 94, 0.3)" 
                      : "0 8px 25px rgba(34, 197, 94, 0.15)"
                  }}
                >
                  {/* Background Pattern */}
                  <PatternBackground 
                    pattern={category.bgPattern} 
                    isActive={isHovered} 
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-7">
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <IconComponent size={28} className="text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3 leading-tight text-center lg:text-left">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed mb-6 flex-grow text-center lg:text-left">
                      {isHovered ? category.detail : category.description}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                      className="mt-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                      }}
                      transition={{ duration: 0.2, delay: isHovered ? 0.15 : 0 }}
                    >
                      <button className="group/btn flex items-center gap-2 text-white font-medium text-sm hover:text-green-100 transition-colors">
                        <span>Learn More</span>
                        <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>

                    {/* Subtle shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0"
                      animate={{ 
                        x: isHovered ? ["0%", "100%"] : "0%",
                        opacity: isHovered ? [0, 1, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <Link to="/allproducts">
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
             Why is this important?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center">
              Modern dairy practices introduced A1 milk from foreign breeds, altering the very nature of milk
and its effects. Unlike A2-A2 milk, A1 milk is linked to serious health issues including:
Autism, brain fog, and memory loss in children,
Protest issues, Fertility issues…etc..
Hormonal imbalance and digestive problems
Diabetes, heart disease, and chronic inflammation in adults, Cancer…
Uterine health issues in women due to hormonal drugs like Oxytocin
Our ancestors knew the power of A2-A2 milk—from cows aligned with Indian climate, soil, and
tradition. We must reclaim that power before it's too late.
            </p>
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore All Solutions</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
        </Link>
      </motion.section>
    </div>
  );
};

export default ShopBySolution;