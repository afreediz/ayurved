import React, { useContext, useEffect, useState } from 'react'
import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { userContext } from '../../context/user'
import { Link, useNavigate } from 'react-router-dom'

const PhoneOptions = () => {
    const {user, setUser} = useContext(userContext)
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 flex md:hidden justify-around gap-4 z-10 bg-white border-gray-800 border-t text-slate-700 py-1'>
        <Link to={"/"} className="flex flex-col items-center">
          <FaHome className=' text-2xl'/>
          <span>Home</span>
        </Link>
        <Link to={"/allproducts"} className="flex flex-col items-center">
          <FaShoppingCart className=' text-2xl'/>
          <span>Shop</span>
        </Link>
        <Link to={user? "/profile" : "/login"} className="flex flex-col items-center" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
            <FaUserCircle className=' text-2xl' />
            <span>Account</span>
        </Link>
    </div>
  )
}

export default PhoneOptions
