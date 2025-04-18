import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/user';
import { FaShoppingBag, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/cart';
import API from '../../services/api';
import { toast } from 'react-toastify';
import { available_currencies, caption } from '../../datas';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(userContext);
  const { cart, currency, setCurrency } = useCart();
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    setIsOpen(false);
  };

  useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await API.get('/category');
        const res = await API.get('/solutions');
        setCategories(data.categories);
        setSolutions(res.data.solutions);
      } catch (error) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    }
    getCategory();
  }, []);

  const navigateCategory = (selectedCategory) => {
    if (selectedCategory === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${selectedCategory}`);
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const navigateSolutions = (selectedSolution) => {
    if (selectedSolution === 'all') {
      navigate('/allproducts');
    } else {
      navigate(`/solutions/${selectedSolution}`);
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-green-900 to-green-700 text-white py-2 text-center text-xs sm:text-sm z-50"
      >
        <div className="container mx-auto px-4">
          <p className="font-light tracking-wide">{caption}</p>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <Link to="/" className="text-green-800 text-xl sm:text-2xl font-bold flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="flex items-center"
              >
                <img src="/images/logo.jpeg" alt="Logo" className="h-8 sm:h-10 mr-2" />
                <img src="/images/name.jpeg" alt="Brand Name" className="h-8 sm:h-10" />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center space-x-1 lg:space-x-2">
              <NavLink to="/allproducts">All Products</NavLink>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('categories')}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 rounded-md group"
                  aria-label="Shop by Category"
                >
                  <span className="mr-1 text-sm lg:text-base">Shop by Category</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === 'categories' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'categories' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-2 border border-gray-100 z-50"
                    >
                      <div className="py-1 px-3 text-xs text-gray-500 border-b border-gray-100 mb-1">
                        Select a category
                      </div>
                      <DropdownItem onClick={() => navigateCategory('all')}>
                        All Categories
                      </DropdownItem>
                      {categories?.map((category, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => navigateCategory(category._id)}
                        >
                          {category.name}
                        </DropdownItem>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('solutions')}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 rounded-md group"
                  aria-label="Shop by Solution"
                >
                  <span className="mr-1 text-sm lg:text-base">Shop by Solution</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === 'solutions' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-2 border border-gray-100 z-50"
                    >
                      <div className="py-1 px-3 text-xs text-gray-500 border-b border-gray-100 mb-1">
                        Select a solution
                      </div>
                      <DropdownItem onClick={() => navigateSolutions('all')}>
                        All Solutions
                      </DropdownItem>
                      {solutions?.map((solution, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => navigateSolutions(solution._id)}
                        >
                          {solution.name}
                        </DropdownItem>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/blogs">Read Blogs</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Currency Selector */}
              <select
                className="bg-transparent text-gray-700 border-none outline-none cursor-pointer hover:text-green-700 focus:ring-0 text-sm lg:block hidden"
                value={currency}
                onChange={handleCurrencyChange}
                aria-label="Select Currency"
              >
                <option value={available_currencies.INDIA}>INR</option>
                <option value={available_currencies.USA}>USD</option>
                <option value={available_currencies.EUROPE}>EUR</option>
                <option value={available_currencies.UAE}>AED</option>
              </select>

              {/* User Profile */}
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700 hover:text-green-700 cursor-pointer"
                  aria-label="User Profile"
                >
                  <FaUserCircle className="text-2xl sm:text-3xl" />
                </motion.div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-2 border border-gray-100 z-50"
                    >
                      {user ? (
                        <>
                          <Link to="/profile">
                            <DropdownItem>Profile</DropdownItem>
                          </Link>
                          <Link to="/orders">
                            <DropdownItem>Orders</DropdownItem>
                          </Link>
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-150"
                          >
                            Log out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/login">
                            <DropdownItem>Login</DropdownItem>
                          </Link>
                          <Link to="/register">
                            <DropdownItem>Sign Up</DropdownItem>
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link to="/cart" aria-label="View Cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700 hover:text-green-700"
                >
                  <FaShoppingBag className="text-2xl sm:text-3xl" />
                  {cart?.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-medium"
                    >
                      {cart?.length}
                    </motion.div>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700 hover:text-green-700"
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
            >
              <div className="px-4 py-4 space-y-2">
                <MobileNavLink to="/allproducts" onClick={() => setIsOpen(false)}>
                  All Products
                </MobileNavLink>
               

                {/* Mobile Categories */}
                <div className="border-b border-gray-200 py-2">
                  <button
                    onClick={() => toggleDropdown('mobileCategories')}
                    className="flex justify-between items-center w-full py-3 text-gray-700 font-medium"
                    aria-label="Toggle Categories"
                  >
                    <span className="text-base">Shop by Category</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === 'mobileCategories' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'mobileCategories' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 py-2 space-y-2"
                      >
                        <MobileDropdownItem
                          onClick={() => navigateCategory('all')}
                        >
                          All Categories
                        </MobileDropdownItem>
                        {categories?.map((category, index) => (
                          <MobileDropdownItem
                            key={index}
                            onClick={() => navigateCategory(category._id)}
                          >
                            {category.name}
                          </MobileDropdownItem>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Solutions */}
                <div className="border-b border-gray-200 py-2">
                  <button
                    onClick={() => toggleDropdown('mobileSolutions')}
                    className="flex justify-between items-center w-full py-3 text-gray-700 font-medium"
                    aria-label="Toggle Solutions"
                  >
                    <span className="text-base">Shop by Solution</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === 'mobileSolutions' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'mobileSolutions' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 py-2 space-y-2"
                      >
                        <MobileDropdownItem
                          onClick={() => navigateSolutions('all')}
                        >
                          All Solutions
                        </MobileDropdownItem>
                        {solutions?.map((solution, index) => (
                          <MobileDropdownItem
                            key={index}
                            onClick={() => navigateSolutions(solution._id)}
                          >
                            {solution.name}
                          </MobileDropdownItem>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavLink to="/blogs" onClick={() => setIsOpen(false)}>
                  Read Blogs
                </MobileNavLink>

                <MobileNavLink to="/about-us" onClick={() => setIsOpen(false)}>
                  About Us
                </MobileNavLink>
                <select
                className="bg-transparent text-gray-700 py-2 border-none outline-none cursor-pointer hover:text-green-700 focus:ring-0 text-sm block"
                value={currency}
                onChange={handleCurrencyChange}
                aria-label="Select Currency"
              >
                <option value={available_currencies.INDIA}>INR</option>
                <option value={available_currencies.USA}>USD</option>
                <option value={available_currencies.EUROPE}>EUR</option>
                <option value={available_currencies.UAE}>AED</option>
              </select>

                {!user && (
                  <div className="flex space-x-3 py-3">
                    <Link
                      to="/login"
                      className="flex-1 py-3 px-4 bg-white border border-green-600 text-green-600 rounded-md text-center font-medium text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 py-3 px-4 bg-green-600 text-white rounded-md text-center font-medium text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {user && (
                  <button
                    onClick={logout}
                    className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-md text-center font-medium text-sm"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

// Custom components for cleaner code
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-3 py-2 text-gray-700 hover:text-green-700 rounded-md group relative text-sm lg:text-base"
  >
    <span>{children}</span>
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 origin-left"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </Link>
);

const DropdownItem = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className="px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 cursor-pointer transition-colors duration-150 text-sm"
  >
    {children}
  </div>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-3 text-gray-700 border-b border-gray-200 font-medium text-base"
  >
    {children}
  </Link>
);

const MobileDropdownItem = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className="py-2 text-gray-600 hover:text-green-700 cursor-pointer text-sm"
  >
    {children}
  </div>
);

export default Navbar;