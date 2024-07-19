import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user'
import { FaShoppingBag, FaUserCircle } from 'react-icons/fa';
import { cartContext } from '../../context/cart'
import API from '../../services/api'
import { toast } from 'react-toastify'
import CustomDropdown from '../utilities/CustomDropdown';
import { caption } from '../../datas';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useContext(userContext)
  const {cart} = useContext(cartContext);
  const [categories, setCategories] = useState()
  const [solutions, setSolutions] = useState()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [profileOpen, setProfileOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  useEffect(()=>{
    async function getCategory(){
      try{
        const {data} = await API.get('/category')
        const res = await API.get('/solutions')
        setCategories(data.categories)
        setSolutions(res.data.solutions)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getCategory()
  },[])
  const navigateCategory = (e) => {
    const selectedCategory = e.target.value;
    if(selectedCategory == "all"){
      navigate('/')
    }else{
    navigate(`/category/${selectedCategory}`)
    }
  }
  const navigateSolutions = (e) => {
    const selectedSolution = e.target.value;
    if(selectedSolution == "all"){
      navigate('/')
    }else{
    navigate(`/solutions/${selectedSolution}`)
    }
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-green-900 text-white py-2 text-center text-sm z-50">
        {caption}
      </div>
      <nav className="bg-white shadow transition-all duration-100">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <Link to="/" className="text-green-800 text-2xl font-bold">
            NAVJEEVANA
          </Link>
          <div className="hidden md:flex md:items-center space-x-8">
            <Link to="/allproducts" className="text-gray-600 hover:text-green-800">All Products</Link>
            <div className="relative group z-50">
              <CustomDropdown menuOpen={isOpen} mainText="Shop by Category" data={categories} navigateHandler={navigateCategory} setMenuOpen={setIsOpen} />
            </div>
            <div className="relative group z-50">
              <CustomDropdown menuOpen={isOpen} mainText="Shop by Solution" data={solutions} navigateHandler={navigateSolutions} setMenuOpen={setIsOpen} />
            </div>
            <Link to="/out-story" className="text-gray-600 hover:text-green-800">Our Story</Link>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center gap-4 text-gray-600 hover:text-green-800">
              <div className="hidden md:flex w-8 md:w-12 lg:w-16 flex-col relative group" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
                <FaUserCircle className='text-2xl' />
                {profileOpen ? user?
                  <div className=" w-24 border border-gray-300 rounded shadow-lg  mt-6 absolute bg-white z-50">
                  <Link to={"/profile"}>
                    <div className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer">Profile</div>
                  </Link>
                  <Link to={"/orders"}>
                    <div className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer">Orders</div>
                  </Link>
                  <button onClick={logout} className='w-full p-2 text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white'>Log out</button>
                </div>:
                <div className=" w-24 border border-gray-300 rounded shadow-lg  mt-6 absolute bg-white z-50">
                  <Link to={"/login"}>
                    <div className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer">Login</div>
                  </Link>
                  <Link to={"/register"}>
                    <div className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer">Sign Up</div>
                  </Link>
                </div>
                :""
                }
              </div>
              <Link to={"/cart"}>
                <FaShoppingBag className='text-2xl' />
              </Link>
            </div>
            <button onClick={toggleMenu} className="text-gray-600 hover:text-green-800 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 12h18m-9 9h9" />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <Link to={"/allproducts"} className="hidden md:block px-4 py-2 text-gray-600 hover:text-green-800">All Products</Link>
            <CustomDropdown menuOpen={isOpen} mainText="Shop by Category" data={categories} navigateHandler={navigateCategory} setMenuOpen={setIsOpen} />
            <CustomDropdown menuOpen={isOpen} mainText="Shop by Solution" data={solutions} navigateHandler={navigateSolutions} setMenuOpen={setIsOpen} />
            <Link to={"/our-story"} className="block px-4 py-2 text-gray-600 hover:text-green-800">Our Story</Link>
            {!user &&<Link to={"/register"} className="hidden md:block px-4 py-2 text-gray-600 hover:text-green-800">All Products</Link>}
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar
