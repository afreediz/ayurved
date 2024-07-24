import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaBox, FaTags, FaReadme, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='bg-white w-full font-medium text-xl p-6 min-h-screen border border-slate-slate-40000'>
      <ul className='list-none flex flex-col gap-6'>
        <Link to="/admin" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
          <FaTachometerAlt className='md:mr-3  min-w-2' />
          <li className=' max-lg:hidden'>Dashboard</li>
        </Link>
        <Link to="/admin/orders" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/orders' ? 'bg-slate-300' : 'hover:bg-gray-200'}`}>
          <FaShoppingCart className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Orders</li>
        </Link>
        <Link to="/admin/users" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/users' ? 'bg-slate-300' : 'hover:bg-gray-200'}`}>
          <FaUsers className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Users</li>
        </Link>
        <Link to="/admin/products" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/products' ? 'bg-slate-300' : 'hover:bg-gray-200'}`}>
          <FaBox className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Products</li>
        </Link>
        <Link to="/admin/categories" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/categories' ? 'bg-slate-300' : 'hover:bg-gray-200'}`}>
          <FaTags className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Categories</li>
        </Link>
        <Link to="/admin/blogs" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/blogs' ? 'bg-slate-300' : 'hover:bg-gray-200'}`}>
          <FaBook className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Blogs</li>
        </Link>
      </ul>
    </div>
  );

}

export default Sidebar
