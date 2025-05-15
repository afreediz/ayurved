import { useState } from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative max-w-6xl mx-auto px-4 lg:my-24 lg:flex grid">
      {/* Image positioned partially outside the main container */}
      <div
        className="lg:absolute lg:block hidden lg:-top-48 right-0 md:right-8 lg:right-12 z-10 transform transition-transform duration-300"
        style={{ transform: isHovered ? "translateY(-10px)" : "translateY(0)" }}
      >
        <img
          src="/images/product.png"
          alt="A2 Bilona Ghee"
          className="h-64 md:h-80 lg:h-[36rem] object-contain drop-shadow-3xl"
        />
      </div>

      {/* Main card with gradient background */}
      <main
        className="p-6 md:p-10 bg-gradient-to-r from-green-600 to-green-800 rounded-xl shadow-2xl transition-all duration-300"
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
            : "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Text and Button Section with improved spacing and alignment */}
          <div className="text-center md:text-left md:w-3/5 pt-4 md:pr-16 lg:pr-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              A2A2 Milk Bilona Ghee
            </h2>
            <p className="text-base md:text-lg text-white opacity-90 mb-8">
              Enjoy the purity of our A2 Bilona Ghee, made from free-roaming
              A2A2 cows using the traditional Bilona method. Rich in nutrients,
              it supports joint health, boosts immunity, aids digestion, and
              adds wholesome goodness to your daily routine.
            </p>
            <div className="mb-6 md:mb-0">
              <Link to="/allproducts"
                className="px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
              >
                Shop Now • 500ml
              </Link>
            </div>
          </div>

          <div
            className="lg:hidden block lg:-top-48 right-0 md:right-8 lg:right-12 z-10 transform transition-transform duration-300"
            style={{
              transform: isHovered ? "translateY(-10px)" : "translateY(0)",
            }}
          >
            <img
              src="/images/product.png"
              alt="A2 Bilona Ghee"
              className="h-64 md:h-80 lg:h-[36rem] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Space reserved for the image that appears from outside */}
          <div className="hidden md:block md:w-2/5 h-64"></div>
        </div>
      </main>
    </div>
  );
}
