import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user'
import { FaSearch, FaUser } from 'react-icons/fa';


const Header = () => {
  const {setUser } = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='bg-white flex px-8 py-4 items-center justify-between border-b-2 border-slate-400'>
      <div className="font-medium text-3xl">ADMIN PANEL</div>
      <div className='flex items-center'>
        <button onClick={logout} className='py-2 px-4 bg-red-600 text-white font-normal rounded focus:outline-none focus:ring-2 focus:ring-red-500'>
          Logout
        </button>
        <Link to="/profile" className="ml-4 rounded-full bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500">
          <FaUser className='w-8 h-8 text-white p-2' />
        </Link>
      </div>
    </div>
  );
}

export default Header
