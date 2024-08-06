import React, {useState, useEffect} from 'react'
import CartCard from '../components/utilities/CartCard'
import { useAuth } from '../context/user'
import { useCart } from '../context/cart'
import { toast } from 'react-toastify'
import API from '../services/api'
import Center from '../components/utilities/Center'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {user} = useAuth()
  const {cart, setCart} = useCart();
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(()=>{
    async function getCartData(){
      try{
        console.log('red');
        const res = await API.post('/products/getcart',{cart})
        console.log(res);
        setData(res.data.cartDetails)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getCartData()
  },[cart])

  const totalPrice = ()=> {
    let total = 0;
    data?.map((p)=>{
      total = total + p.price * p.cart_quantity
    })
    return total.toLocaleString("en-Us",{
      style:"currency",
      currency:'INR'
    })
  }
  const checkout = async()=>{
    try{
      const res = await API.post('/orders',{
        cart:cart.map((product)=>{  
          return {
            product:product._id,
            cart_quantity:product.cart_quantity
          }
        })
      })
      const options = {
        key: "rzp_test_4wRqHdbX5YleJ3",
        amount: res.data.amount,
        currency: "INR",
        name: res.data.name,
        description: "session will expire in 5 minutes",
        order_id: res.data.order_id,
        // callback_url: `http://localhost:3002/api/orders/paymentverification`,
        handler: async function (response) {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }

        const result = await API.post("/orders/paymentverification", data);
        if (result.data.success) {
            toast.success("Order Successful")
            setCart([])
        } else {
            toast.error("Payment Failed")
        }
    }
  };
    const razor = new window.Razorpay(options);
    razor.open();
      // setCart([])
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  return (
    <Center>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-8 md:gap-4'>
      {/* Summary Section (For Mobile View) */}
      <div className="summary md:col-span-3 md:bg-gray-100 md:p-6 md:rounded-lg md:order-2">
        <h1 className="text-2xl font-semibold">Cart Summary</h1>
        <h2 className="text-lg opacity-50">{cart?.length} products in cart.</h2>
        
        {/* Individual Costs */}
        <div className="costs mb-2">
          <div className="individual-costs">
            {data?.map((product, index) => (
              <div key={index} className="mb-4 flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between border-b border-black">
                  <span>quantity :</span>
                  <span>{product.cart_quantity}</span>
                </div>
                <div className=" flex justify-between">
                  <span>subtotal :</span>
                  <span className=' font-semibold'>₹{product.price * product.cart_quantity}</span>
                </div>
              </div>
            ))}
          </div>
                    
          {/* Grand Total */}
          <div className="text-xl mb-2 flex justify-between">
            <span>Grand total Price: </span>
            <span className='text-2xl font-bold'>{cart.length > 0 ? totalPrice() : 0}</span>
          </div>
        </div>
        
        {/* Checkout Button */}
        {!user && <p className="text-red-500 mb-4">Please {<Link to={"/login"} className=' underline text-blue-500'>login</Link>} to checkout</p>}
        <button
          onClick={checkout}
          className={`w-full py-3 bg-green-500 hover:bg-green-700 transition-all text-white font-semibold rounded-md ${
            !user || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!user || cart.length === 0}
        >
          PAY
        </button>
      </div>

      {/* Products Section */}
      <div className="products md:col-span-5">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        {/* Display cart items */}
        {data?.map((product, index) => (
          <CartCard key={index} product={product} />
        ))}
        {cart.length == 0 && <div className="font-semibold flex flex-col items-center justify-center">
            <span className='text-xl'>Cart is empty</span>
            <Link to="/allproducts" className="text text-blue-500">Shop Now</Link>
          </div>}
      </div>
    </div>
    </Center>
  );
}

export default Cart
