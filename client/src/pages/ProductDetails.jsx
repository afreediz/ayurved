import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { cartOperations, useCart } from "../context/cart";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ProductCard from "../components/utilities/ProductCard";
import { Lens } from "../components/utilities/lens";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [hovering, setHovering] = useState(false);
  const [relatedProd, setRelatedProd] = useState();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();
  const context = useCart();
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    async function getProduct() {
      try {
        const { data } = await API.get(`products/${slug}`);
        setProduct(data.product);
        const d = await API.get(
          `products/related-products/${data.product._id}/${data.product.category._id}`
        );
        setRelatedProd(d.data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    }
    getProduct();
  }, [slug]);

  if (loading) return <Loader />;
  if (!product)
    return <div className="text-center py-20 text-xl">No product found</div>;

  // Parse product contents and wrap only the first three images with Lens
  const parseContent = (content) => {
    let currentImageIndex = 0;
    return parse(content, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          currentImageIndex++;
          const { src, alt } = domNode.attribs;
          // Wrap only the first three images with Lens
          if (currentImageIndex <= 3) {
            return (
              <Lens hovering={hovering} setHovering={setHovering}>
                <img
                  src={src || "https://via.placeholder.com/600"}
                  alt={alt || "Product content image"}
                  className="object-contain h-full w-full transition duration-500"
                />
              </Lens>
            );
          }
          // For images beyond the third, return without Lens
          return (
            <img
              src={src || "https://via.placeholder.com/600"}
              alt={alt || "Product content image"}
              className="object-contain h-full w-full transition duration-500"
            />
          );
        }
      },
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-neutral-50 min-h-screen overflow-hidden">
      {/* Hero section with subtle background */}
      <div className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-96 -right-32 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-30"></div>
          <div className="absolute top-64 -left-32 w-96 h-96 rounded-full bg-neutral-100 blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Product image */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-50 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg border border-neutral-100">
                  <Lens hovering={hovering} setHovering={setHovering}>
                    <img
                      src={product.image || "https://via.placeholder.com/600"}
                      alt={product.name}
                      className="object-contain h-full w-full transition duration-700 transform group-hover:scale-105"
                    />
                  </Lens>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="w-full md:w-1/2 lg:w-3/5 mt-6 md:mt-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                  {product.category && (
                    <span className="inline-block px-4 py-1.5 text-xs font-medium bg-gradient-to-r from-green-50 to-blue-50 text-neutral-700 rounded-full tracking-wider border border-neutral-200">
                      {product.category.name}
                    </span>
                  )}

                  {product.quantity > 0 ? (
                    <span className="text-sm text-neutral-600 flex items-center bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      In Stock ({product.quantity})
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 flex items-center bg-red-50 px-3 py-1 rounded-full border border-red-100">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight leading-tight">
                  {product.name}
                </h1>

                <div className="mb-6">
                  <div className="inline-block text-slate-900 px-4 py-2 ">
                    <h2 className="text-2xl font-bold">
                      {context.currencySymbol}{" "}
                      {(product.price * context.baseCurrencyRate).toFixed(2)}
                    </h2>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="grid lg:flex flex-wrap gap-4">
                    <button
                      disabled={product.quantity === 0}
                      className={`py-3.5 px-8 rounded-full font-medium transition-all duration-300 flex-1 relative overflow-hidden group ${
                        product.quantity === 0
                          ? "bg-neutral-200 cursor-not-allowed text-neutral-400"
                          : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg"
                      }`}
                      onClick={() => {
                        cartOperations.addToCart({ _id: product._id }, context);
                        toast.success("Added to cart");
                      }}
                    >
                      <span className="relative z-10">Add to Cart</span>
                      {product.quantity > 0 && (
                        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      )}
                    </button>

                    <button
                      disabled={product.quantity === 0}
                      className={`py-3.5 px-8 rounded-full font-medium transition-all duration-300 flex-1 relative overflow-hidden group ${
                        product.quantity === 0
                          ? "bg-neutral-200 cursor-not-allowed text-neutral-400"
                          : "bg-green-700 hover:bg-green-800 text-white shadow-lg"
                      }`}
                      onClick={() => {
                        cartOperations.addToCart({ _id: product._id }, context);
                        navigate("/cart");
                      }}
                    >
                      <span className="relative z-10">Buy Now</span>
                      {product.quantity > 0 && (
                        <span className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      )}
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        Fast delivery available
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        100% authentic product
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product content section with tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          {product.contents && (
            <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-neutral-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
              <div className="product-content">
                {parseContent(product.contents)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products section */}
      {relatedProd?.length > 0 && (
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-white"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-40"></div>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-30"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 relative">
                You May Also Like
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500"></span>
              </h2>
              <Link
                to="/allproducts"
                className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100"
              >
                <span className="text-neutral-800 font-medium">View All</span>
                <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white group-hover:bg-green-600 transition-colors duration-300">
                 <ArrowRight />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {relatedProd.map((product, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-neutral-100 transform hover:-translate-y-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
