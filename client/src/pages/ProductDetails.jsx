import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { cartOperations, useCart } from "../context/cart";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ProductCard from "../components/utilities/ProductCard";
import { Lens } from "../components/utilities/lens";
import parse from "html-react-parser";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [hovering, setHovering] = useState(false);
  const [relatedProd, setRelatedProd] = useState();
  const [loading, setLoading] = useState(true);
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

  // Parse product contents and wrap images with Lens
  const parseContent = (content) => {
    return parse(content, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          const { src, alt } = domNode.attribs;
          return (
            <Lens hovering={hovering} setHovering={setHovering}>
              <img
                src={src || "https://via.placeholder.com/600"}
                alt={alt || "Product content image"}
                className="object-contain h-full w-full transition duration-300 hover:scale-105"
              />
            </Lens>
          );
        }
      },
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero section with subtle background */}
      <div className="relative bg-gradient-to-b from-neutral-50 to-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Product image */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-100">
                <div className="aspect-square bg-white flex items-center justify-center p-8">
                  <Lens hovering={hovering} setHovering={setHovering}>
                    <img
                      src={product.image || "https://via.placeholder.com/600"}
                      alt={product.name}
                      className="object-contain h-full w-full transition duration-300 hover:scale-105"
                    />
                  </Lens>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="w-full md:w-1/2 lg:w-3/5 mt-6 md:mt-0">
              <div className="flex flex-col h-full">
                {product.category && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full tracking-wider">
                      {product.category.name}
                    </span>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
                  {product.name}
                </h1>

                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                    {context.currencySymbol}{" "}
                    {(product.price * context.baseCurrencyRate).toFixed(2)}
                  </h2>

                  {product.quantity > 0 ? (
                    <p className="text-sm text-neutral-600 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      In Stock ({product.quantity} available)
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      Out of Stock
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <p className="text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <button
                      disabled={product.quantity === 0}
                      className={`py-3 px-6 rounded-full font-medium transition-all duration-300 flex-1 ${
                        product.quantity === 0
                          ? "bg-neutral-200 cursor-not-allowed text-neutral-400"
                          : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm hover:shadow-md"
                      }`}
                      onClick={() => {
                        cartOperations.addToCart({ _id: product._id }, context);
                        toast.success("Added to cart");
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      disabled={product.quantity === 0}
                      className={`py-3 px-6 rounded-full font-medium transition-all duration-300 flex-1 ${
                        product.quantity === 0
                          ? "bg-neutral-200 cursor-not-allowed text-neutral-400"
                          : "bg-green-700 hover:bg-green-800 text-white shadow-sm hover:shadow-md"
                      }`}
                      onClick={() => {
                        cartOperations.addToCart({ _id: product._id }, context);
                        navigate("/cart");
                      }}
                    >
                      Buy Now
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <div className="flex items-center text-sm text-neutral-600 mb-3">
                      <svg
                        className="w-5 h-5 mr-3 text-green-600"
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
                      Fast delivery available
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <svg
                        className="w-5 h-5 mr-3 text-green-600"
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
                      100% authentic product
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none">
          {product.contents && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
              <div className="product-content">{parseContent(product.contents)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Related products section */}
      {relatedProd?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900">
              You May Also Like
            </h2>
            <Link
              to="/allproducts"
              className="text-green-700 hover:text-green-800 font-medium flex items-center group"
            >
              View All
              <svg
                className="w-5 h-5 ml-1 transition-transform duration-300 transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProd.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;