import React from "react";
import {
  ShoppingCart,
  CheckCircle,
  Heart,
  Brain,
  Shield,
  Star,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AllProductsSummary() {
  const products = [
    {
      name: "Shatavari",
      fullName: "Shatavari GHEE",
      subtitle: "For Women's Health",
      image: "/images/shatavari-ghee.jpg",
      jarColor: "red-600",
      benefits: [
        "Reproductive health support",
        "Supports lactation",
        "Anti-aging properties",
        "Hormonal balance",
      ],
    },
    {
      name: "GirCow's",
      fullName: "GirCow's GHEE",
      subtitle: "Pure A2 A2 Ghee",
      image: "/images/gircows-ghee.jpg",
      jarColor: "yellow-500",
      benefits: [
        "Pure A2 A2 milk",
        "Traditional bilona method",
        "Rich in omega-3 & 6",
        "Boosts immunity",
      ],
    },
    {
      name: "Ashwagandha",
      fullName: "Ashwagandha GHEE",
      subtitle: "Stress Relief & Vitality",
      image: "/images/ashwagandha-ghee.jpg",
      jarColor: "orange-600",
      benefits: [
        "Reduces stress & anxiety",
        "Improves sleep quality",
        "Enhances energy levels",
        "Supports immunity",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-800 to-green-600">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Premium A2 A2 Ghee Collection
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Pure, Traditional, and Enriched with Ayurvedic Herbs
            </p>
            <div className="flex justify-center items-center gap-4 text-white">
              <Leaf className="text-green-300" />
              <span className="text-lg">
                100% Organic • Farm Fresh • Traditional Process
              </span>
              <Leaf className="text-green-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center ">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Our Premium Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of traditional A2 A2 ghee products, each
              crafted with care and enriched with powerful Ayurvedic herbs
            </p>
          </div>

          {/* Product Display */}
          <div className="relative ">
            <img
              src="/images/all-products.png"
              alt="All Products"
              className="w-full max-w-4xl mx-auto rounded-2xl h-96 object-contain"
            />

            {/* Product Cards Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`h-2 bg-gradient-to-r from-${product.jarColor} to-green-600`}
                  ></div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-green-600 font-medium">
                        {product.fullName}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center justify-center">
                        <Star className="mr-2 text-green-600" size={20} />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-600"
                          >
                            <CheckCircle
                              className="mr-2 text-green-500 mt-1 flex-shrink-0"
                              size={16}
                            />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center">
                      <ShoppingCart className="mr-2" size={18} />
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farm Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-green-800 mb-6">
                From Our Farm to Your Home
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">
                      Pure A2 A2 Milk
                    </h3>
                    <p className="text-gray-600">
                      Our Gir cows produce the highest quality A2 A2 milk,
                      ensuring better digestion and nutrition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Leaf className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">
                      Traditional Bilona Method
                    </h3>
                    <p className="text-gray-600">
                      We use age-old traditional methods to churn our ghee,
                      preserving all nutrients and authentic taste.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Heart className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">
                      Ethically Sourced
                    </h3>
                    <p className="text-gray-600">
                      Our cows are treated with love and care, grazing freely in
                      our organic farms.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <p className="text-green-800 font-semibold mb-2">
                  FORTUNE GATE ORGANIC FARMING
                </p>
                <p className="text-gray-600">
                  Eravathoor, Thrissur, Kerala - 680731
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/cows.jpeg"
                alt="Our Gir Cows"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <p className="text-green-700 font-semibold">
                  Our Happy Gir Cows
                </p>
                <p className="text-gray-600 text-sm">
                  The source of pure A2 A2 milk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
            Why Choose Our Ghee?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Made from pure A2 A2 milk of grass-fed Gir cows
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Ayurvedic Wisdom
              </h3>
              <p className="text-gray-600">
                Enriched with powerful herbs for specific health benefits
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Health Benefits
              </h3>
              <p className="text-gray-600">
                Rich in vitamins, antioxidants, and essential fatty acids
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Experience the Purity of Traditional Ghee
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Nourish your body and mind with our premium collection of Ayurvedic
            ghee products
          </p>
          <Link to={"/allproducts"}>
            <button className="bg-white text-green-700 font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-all duration-200 transform hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
