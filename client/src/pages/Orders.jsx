import React, { useEffect, useState } from 'react'
import OrdersCard from '../components/utilities/OrdersCard'
import API from '../services/api'
import { toast } from 'react-toastify'
import Center from '../components/utilities/Center'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'

const Orders = () => {
  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(true)
  console.log(orders);
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
    async function getOrders(){
      try{
        const {data} = await API.get("orders/")
        setOrders(data.orders)
        setLoading(false)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getOrders()
  },[])
  const format_date = (date)=> {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
  }
  console.log(orders);
  return (
    <Center className='my-10'>
      <div className="md:hidden mt-10 w-full flex rounded justify-around text-xl border border-gray-800 relative">
        <Link to={'/profile'}><span className="py-2 text-gray-400">Profile</span></Link>
        <span className="border-l-2 border-gray-800 h-full absolute left-1/2 transform -translate-x-1/2"></span>
        <Link to={'/orders'}><span className="py-2 text-gray-800">Orders</span></Link>
      </div>
      <div className="overflow-x-auto">
        <table className='w-full bg-white shadow-lg rounded-lg'>  
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='hidden md:table-cell py-2 px-4 border border-gray-300'>Index</th>
              <th className='hidden md:table-cell py-2 px-4 border border-gray-300'>Order ID</th>
              <th className='py-2 px-4 border border-gray-300'>Date</th>
              <th className='py-2 px-4 border border-gray-300'>Payment</th>
              <th className='py-2 px-4 border border-gray-300'>Status</th>
              {/* <th className='py-2 px-4 border border-gray-300'>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, index) => (
              <tr key={index} className='border-b border-gray-200'>
                <td className='hidden md:table-cell py-2 px-4 border-r border-gray-300'>{index+1}</td>
                <td className='hidden md:table-cell py-2 px-4 border-r border-gray-300'>{order._id}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{format_date(order.createdAt)}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{order.payment}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{order.status}</td>
                {/* <td className='py-2 px-4 border-r border-gray-300'>
                  <button 
                    disabled={order.status == 'Delivered' || order.status == 'Canceled'}
                    onClick={() => cancelOrder(order._id)}
                    className={`${order.status == 'Delivered' || order.status == 'Canceled' ? 'text-gray-500 cursor-not-allowed ' : ' hover:text-red-700 text-red-500'}`}>
                    Cancel
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-4">
        {orders && orders.map((order, index) => (
            <OrdersCard
              key={index}
              product={order.product}
              quantity={order.cart_quantity}
              order_id={order._id}
              order_date={format_date(order.createdAt)}
            />
        ))}
        {orders && orders.length == 0 ?<div className='text-3xl text-center'>No Orders Found</div>:""}
      </div>
      {loading && <Loader />}
    </Center>
  );
}

export default Orders
