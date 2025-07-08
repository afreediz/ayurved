import { useState } from "react";
import { Link } from "react-router-dom";

export default function BilonaCowDetails() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "🥛",
      title: "Natural A2A2 Protein",
      description: "Produces natural A2A2 protein milk—easier to digest"
    },
    {
      icon: "💪",
      title: "Health Benefits",
      description: "Boosts immunity and gut health naturally"
    },
    {
      icon: "🌿",
      title: "Ethical Farming",
      description: "Raised ethically, free from hormones and antibiotics"
    },
    {
      icon: "🍯",
      title: "Traditional Ghee",
      description: "Integral to traditional Bilona ghee preparation"
    },
    {
      icon: "♻️",
      title: "Sustainability",
      description: "Supports sustainable and regenerative farming"
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Text Content Section */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            
            {/* Main Heading */}
            <div className="relative">
              <h1 className="text-gray-800 text-sm font-semibold tracking-wider uppercase mb-2">
                Sacred & Traditional
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
               <span className="">Meet </span>the <span className=" relative">
                  A2A2 Gir Cow
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-green-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 0 100 5" stroke="currentColor" strokeWidth="3" fill="none"/>
                  </svg>
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Revered in Ayurveda and native to India, the Gir cow is a sacred and gentle breed known for producing highly nutritious A2A2 milk. Raised in stress-free, cruelty-free environments, these cows provide milk that is rich in beta-casein protein.
            </p>

            {/* Interactive Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-green-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 shadow-md hover:shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  {activeFeature === index && (
                    <p className="text-xs opacity-90">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/allproducts"
                className="group relative inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:bg-green-700"
              >
                <span className="relative z-10">Explore Ghee Products</span>
                <span className="absolute inset-0 bg-yellow-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="absolute inset-0 flex items-center justify-center text-green-900 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                  Explore Ghee Products
                </span>
              </Link>
              
              <button className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 rounded-2xl">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            {/* Cow Image */}
            <div className="relative z-10 p-8">
              <img
                src="/images/bilonaa_cow.jpeg"
                alt="A2A2 Gir Cow"
                className="w-full h-auto object-contain transform transition-all duration-700 hover:scale-105"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 bg-white p-3 rounded-full shadow-lg animate-bounce">
              <span className="text-2xl">🐄</span>
            </div>
            <div className="absolute bottom-8 left-8 bg-yellow-400 p-2 rounded-full shadow-lg animate-pulse">
              <span className="text-xl">✨</span>
            </div>
          </div>

          {/* Info Badge */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">100% Pure A2A2 Milk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Trust Indicators */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h4 className="font-semibold text-gray-800">Premium Quality</h4>
          <p className="text-sm text-gray-600">Certified A2A2 milk</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🌱</div>
          <h4 className="font-semibold text-gray-800">Organic Feed</h4>
          <p className="text-sm text-gray-600">100% natural diet</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">❤️</div>
          <h4 className="font-semibold text-gray-800">Ethically Raised</h4>
          <p className="text-sm text-gray-600">Cruelty-free farming</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🔬</div>
          <h4 className="font-semibold text-gray-800">Lab Tested</h4>
          <p className="text-sm text-gray-600">Quality assured</p>
        </div>
      </div>
    </div>
  );
}