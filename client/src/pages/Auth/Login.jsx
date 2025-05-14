import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Mail, Lock, ArrowRight, ShoppingBag } from 'lucide-react'
import { userContext } from '../../context/user'
import API from '../../services/api'

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  if (user) {
    return navigate('/')
  }

  const onchange = (e) => {
    const { name, value } = e.target
    setData((old_data) => {
      return {
        ...old_data,
        [name]: value
      }
    })
  }

  const login = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await API.post('auth/login', {
        ...data
      })
      setUser(response.data.user)
      toast.success("User Login successful")
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Login Form */}
      <div className='flex-1 flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-50 p-6'>
        <div className='w-full max-w-md'>
          {/* Logo and Brand */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center  mb-4'>
                <img src="/images/logo.jpeg" alt="Logo" className="h-14" />
                <img src="/images/name.jpeg" alt="Brand Name" className="h-14" />
              
            </div>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Welcome Back!</h1>
            <p className='text-gray-600'>Sign in to your account to continue shopping</p>
          </div>

          {/* Login Form */}
          <form onSubmit={login} className='space-y-6'>
            <div className='space-y-4'>
              <div className='relative'>
                <Mail className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
                <input
                  type="email"
                  name='email'
                  required
                  value={data.email}
                  onChange={onchange}
                  className='w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white'
                  placeholder='Email address'
                />
              </div>

              <div className='relative'>
                <Lock className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
                <input
                  type="password"
                  name='password'
                  required
                  minLength={8}
                  value={data.password}
                  onChange={onchange}
                  className='w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white'
                  placeholder='Password'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className='w-5 h-5' />
                </>
              )}
            </button>

            <div className='space-y-3'>
              <Link to='/forget-password' className='block text-center text-green-600 hover:text-green-700 font-medium'>
                Forgot your password?
              </Link>
              <div className='text-center text-gray-600'>
                Don't have an account?{' '}
                <Link to='/register' className='text-green-600 hover:text-green-700 font-semibold'>
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          {/* Trust Badges */}
          {/* <div className='mt-8 text-center'>
            <p className='text-sm text-gray-500 mb-4'>Trusted by thousands of customers</p>
            <div className='flex justify-center gap-8'>
              <div className='text-center'>
                <p className='text-2xl font-bold text-green-600'>100%</p>
                <p className='text-xs text-gray-600'>Pure A2A2</p>
              </div>
              <div className='text-center'>
                <p className='text-2xl font-bold text-green-600'>5⭐</p>
                <p className='text-xs text-gray-600'>Rating</p>
              </div>
              <div className='text-center'>
                <p className='text-2xl font-bold text-green-600'>24/7</p>
                <p className='text-xs text-gray-600'>Support</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Right Side - Product Showcase */}
      <div className='hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
        <div className='relative z-10 flex flex-col justify-center items-center p-12 text-white'>
          {/* Product Image */}
          <div className='mb-8 relative'>
            <div className='absolute inset-0 bg-white rounded-full blur-3xl opacity-30 scale-125'></div>
            <img
              src="/images/all-products.png"
              alt="Premium A2A2 Ghee"
              className='object-cover rounded-full relative z-10 shadow-2xl'
            />
          </div>

          {/* Product Info */}
          {/* <div className='text-center max-w-md'>
            <h2 className='text-4xl font-bold mb-4'>Premium A2A2 Ghee</h2>
            <p className='text-xl mb-6 opacity-90'>
              Experience the authentic taste of traditional ghee made from pure A2A2 cow milk
            </p>
            
            <div className='grid grid-cols-2 gap-4 text-left'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span>100% Natural</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span>Lab Tested</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span>No Additives</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span>Farm Fresh</span>
              </div>
            </div>
          </div> */}

          {/* Decorative Elements */}
          <div className='absolute top-10 right-10 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-2xl'></div>
          <div className='absolute bottom-10 left-10 w-40 h-40 bg-green-500 rounded-full opacity-20 blur-2xl'></div>
        </div>
      </div>
    </div>
  )
}

export default Login