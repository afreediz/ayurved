import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../../services/api'
import Loader from '../../components/Loader'
import Center from '../../components/utilities/Center'
const OrderDetails = () => {
  const {id} = useParams()
  const [order, setOrder] = useState("")
  const [loading, setLoading] = useState(true)

  console.log(order);
  useEffect(() => {
    async function getData(){
      const {data} = await API.get(`/orders/${id}`)
      setOrder(data.order)
      setLoading(false)
    }
    getData()
  }, [])
  return (
    <Center className='my-10 relative'>
      <form className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <div className="my-2">
          <label className='block text-gray-700' htmlFor="name">Unique Id</label>
          <input name='name' type="text" id='name' value={order && order._id} placeholder='Enter your name' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">User</label>
          <input name='role' type="text" id="role" value={order && order.user.email} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Product</label>
          <input name='phone' type="text" id="phone" value={order && order.product.name} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Cart Quantity</label>
          <input name='status' type="text" id="status" value={order && order.cart_quantity} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>        
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Payment</label>
          <input name='role' type="text" id="role" value={order && order.payment} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Payment Id</label>
          <input name='role' type="text" id="role" value={order && order.payment_id} onChange={(e)=>{e.target.value=""}} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="email">Order Id</label>
          <input name='email' type="text" id="email" value={order && order.order_id} placeholder='Enter your email' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Receipt</label>
          <input name='phone_verified' type="text" id="phone" value={order && order.receipt} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Status</label>
          <input name='role' type="text" id="role" value={order && order.status} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
      </form>
      
      {loading && <Loader />}
    </Center>
  )
}

export default OrderDetails
