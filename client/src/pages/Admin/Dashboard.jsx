import { useEffect, useState } from 'react';
import { FaCube, FaUser, FaClipboardList } from 'react-icons/fa'; // Import icons
import ProductsChart from "../../components/Admin/Charts/Products";
import UsersChart from "../../components/Admin/Charts/Users";
import OrdersChart from "../../components/Admin/Charts/Orders";
import API, {format_date} from '../../services/api';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    async function fetchData() {
      const res1 = await API.get("products/dashboard")
      setProducts(res1.data)
      const res2 = await API.get("users/dashboard")
      setUsers(res2.data)
      const res3 = await API.get("orders/dashboard")
      setOrders(res3.data)
    }
    fetchData();
  }, []);
  return (
    <div className="mx-4">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:w-full lg:grid-cols-3 gap-6">
        <div className=" bg-white rounded-lg p-6 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            <FaCube className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Products</div>
              <div className="text-2xl font-bold">{products && products.products_count}</div>
            </div>
          </div>
        </div>
        <div className=" bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaUser className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{users && users.users_count}</div>
            </div>
          </div>
        </div>
        <div className=" bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaClipboardList className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold">{orders && orders.orders_count}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-2 mt-8">
        <div className=" bg-white shadow-md rounded-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Orders Chart</h2>
          { orders && <OrdersChart orders={orders.orders} />}
        </div>
        <div className=" bg-white shadow-md rounded-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Users Chart</h2>
          { users && <UsersChart users={users.users} />}
        </div>
        <div className=" bg-white shadow-md rounded-lg p-6 col-span-1">
          <h2 className="text-xl font-semibold mb-4">Products Chart</h2>
          { products && <ProductsChart products={products.products} />}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="">
          <table className="bg-white min-w-full">
            <thead>
              <tr className=' shadow-md border-2 border-slate-100'>
                {/* <th className="hidden md:block px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Index</th> */}
                <th className=" hidden md:block px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="hidden md:block px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody className='  shadow-md'>
            {orders && orders.recent_orders.map((order, index)=>{
              return (
                <tr key={index}>
                {/* <td className="hidden md:block px-4 py-4 whitespace-nowrap">{index+1}</td> */}
                <td className=" hidden md:block px-4 py-4 whitespace-nowrap">{order._id}</td>
                <td className="px-4 py-4 whitespace-nowrap">{order.user.name}</td>
                <td className="hidden md:block px-6 py-4 whitespace-nowrap">{order.product? order.product.name:"product no longer available"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{format_date(order.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.payment}</td>
              </tr>
            )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
