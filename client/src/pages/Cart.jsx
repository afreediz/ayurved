import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/user';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

// Luxury Cart Item Component
const LuxuryCartItem = ({ product, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col md:flex-row border-b border-gray-200 py-6 gap-4">
      <div className="md:w-1/4 aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={product.image || "/api/placeholder/300/300"} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.shortdesc || ''}</p>
        </div>
        
        <div className="flex items-center mt-4">
          <button 
            onClick={() => onUpdateQuantity(product._id, product.cart_quantity - 1)}
            disabled={product.cart_quantity <= 1}
            className="p-1 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          
          <span className="mx-4 text-center w-8">{product.cart_quantity}</span>
          
          <button 
            onClick={() => onUpdateQuantity(product._id, product.cart_quantity + 1)}
            className="p-1 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-lg font-medium text-gray-900">
            {product.currencySymbol} {(product.price * product.cart_quantity * product.baseCurrencyRate).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {product.currencySymbol} {(product.price * product.baseCurrencyRate).toFixed(2)} each
          </p>
        </div>
        
        <button 
          onClick={() => onRemove(product._id)}
          className="text-gray-400 hover:text-red-500 transition-colors mt-4"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { user } = useAuth();
  const { cart, setCart, baseCurrencyRate, currencySymbol, currency } = useCart();
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    async function getCartData() {
      try {
        const res = await API.post('/products/getcart', { cart });
        const cartDetailsWithCurrency = res.data.cartDetails.map(item => ({
          ...item, 
          baseCurrencyRate,
          currencySymbol
        }));
        setData(cartDetailsWithCurrency);
      } catch (error) {
        toast.error(error.response?.data.message || 'Failed to load cart items');
        console.error(error);
      }
    }
    
    if (cart.length > 0) {
      getCartData();
    } else {
      setData([]);
    }
  }, [cart, baseCurrencyRate, currencySymbol]);

  const calculateSubtotal = () => {
    let total = 0;
    data?.map((p)=>{
      total = total + p.price * p.cart_quantity
    })
    total = total*baseCurrencyRate
    return total.toString()
  }
  const checkout = async()=>{
    try{
      const res = await API.post('/orders',{
        cart:cart.map((product)=>{  
          return {
            product:product._id,
            cart_quantity:product.cart_quantity,
            currency:currency
          }
        }), currency:currency
      })
      console.log(res);
      
      const options = {
        key: "rzp_live_AONloOEyl1iDRf",//
        amount: res.data.amount,
        currency: "INR",
        name: "NAVJEEVANA",
        description: "session will expire in 5 minutes",
        order_id: res.data.order_id,
        handler: async function (response) {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await API.post("/orders/paymentverification", data);
          if (result.data.success) {
            toast.success("Order placed successfully");
            setCart([]);
          } else {
            toast.error("Payment failed. Please try again.");
          }
        },
        "prefill": {
          "name": res.data.name,
          "email": res.data.email,
          "contact": res.data.phone
        },
        "theme": {
          "color": "#000000"
        }
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error(error.response?.data.message || 'Checkout failed');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Discover our collection of luxury products</p>
            <Link 
              to="/allproducts" 
              className="flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="border-t border-gray-200">
                {data.map((product) => (
                  <LuxuryCartItem 
                    key={product._id} 
                    product={product} 
                    onUpdateQuantity={updateItemQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/allproducts" 
                  className="text-sm font-medium text-gray-600 hover:text-black flex items-center"
                >
                  <ArrowRight size={16} className="mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-gray-600">Subtotal ({cart.length} items)</div>
                    <div className="font-medium">{currencySymbol} {calculateSubtotal()}</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-gray-600">Tax Estimate</div>
                    <div className="font-medium">{currencySymbol} {calculateTax()}</div>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <div className="text-lg font-medium text-gray-900">Total</div>
                    <div className="text-lg font-medium text-gray-900">
                      {currencySymbol} {calculateTotal()}
                    </div>
                  </div>
                </div>
                
                {!user && (
                  <p className="text-sm text-red-600 mt-4">
                    Please{' '}
                    <Link to="/login" className="underline font-medium">
                      login
                    </Link>{' '}
                    to complete your purchase.
                  </p>
                )}
                
                <button
                  onClick={checkout}
                  disabled={!user || cart.length === 0 || isProcessing}
                  className={`w-full mt-6 py-4 bg-black text-white font-medium
                    ${(!user || cart.length === 0 || isProcessing) ? 
                      'opacity-60 cursor-not-allowed' : 
                      'hover:bg-gray-800 transition-colors'}`}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <div className="mt-6 text-xs text-gray-500 text-center">
                  Secure checkout. Free returns within 30 days.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;