import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user'
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';


const Header = () => {
  const {setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='bg-white flex px-8 py-4 items-center justify-between border-b-2 border-slate-400'>
      <div className="font-medium text-3xl">ADMIN PANEL</div>
      <div className='flex items-center gap-2'>
        <button onClick={logout} className='py-2 px-3 bg-red-600 text-white font-normal rounded focus:outline-none focus:ring-2 focus:ring-red-500'>
          Logout
        </button>
        <Link to="/profile" className="ml-4 rounded-full bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500">
          <FaUser className='text-3xl text-white p-2' />
        </Link>
        <div className=" md:hidden">
          <FaBars onClick={() => setMenuOpen(!menuOpen)} className='lg:hidden text-3xl cursor-pointer ' />
        </div>
      </div>
      {menuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-10">
          <div className="flex justify-end px-6">
            <FaTimes onClick={() => setMenuOpen(!menuOpen)} className='text-white text-3xl cursor-pointer ' />
          </div>
          <div className="flex flex-col items-center my-10 h-full text-white text-2xl gap-6">
            <Link to={"/admin"} className='inline-block py-4 px-10 bg-slate-900 rounded' >Dashboard</Link>
            <Link to={"/admin/orders"} className='inline-block py-4 px-10 bg-slate-900 rounded' >Orders</Link>
            <Link to={"/admin/users"} className='inline-block py-4 px-10 bg-slate-900 rounded' >Users</Link>
            <Link to={"/admin/products"} className='inline-block py-4 px-10 bg-slate-900 rounded' >Products</Link>
            <Link to={"/admin/categories"} className='inline-block py-4 px-10 bg-slate-900 rounded' >Categories</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header
