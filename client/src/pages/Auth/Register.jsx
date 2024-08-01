import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {userContext} from '../../context/user'
import API from '../../services/api'
import { Link } from 'react-router-dom'
const Register = () => {
  const {user} = useContext(userContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:""
  })
  const [disabled, setDisabled] = useState(false)
  if(user){
    return navigate('/')
  }
  const onchange = (e) => {
    const {name, value} = e.target;
    setData((old_data)=>{
      return{
        ...old_data,
        [name]:value
      }
    })
  }
  const register = async(e)=> {
    e.preventDefault()
    try{
      const res = await API.post('auth/register',{...data})
      setDisabled(true)
      toast.success("Verification link has been sent to your email, Please verify your email", {
        autoClose: 10000,
      })
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  return (
<div className='flex justify-center items-center bg-gray-100 my-10'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-center text-gray-700 mb-6'>Register Form</h1>
        <form onSubmit={register}>
          <div className='mb-4'>
            <input 
              type="text" 
              name='name' 
              minLength={3}
              value={data.name} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Name' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="email" 
              name='email' 
              value={data.email} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Email' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="password" 
              name='password' 
              minLength={8}
              value={data.password} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Password' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="number" 
              name='phone' 
              minLength={10}
              value={data.phone} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Phone' 
            />
          </div>
          <button 
            type='submit' 
            // className='w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors'
            disabled={disabled}
            className={`w-full py-2 text-white font-semibold rounded-lg ${disabled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} transition-colors`}
          >
            Register
          </button>
          <Link to='/login' ><span className=' text-blue-500 block text-center mt-4'>Login to an existing account</span></Link>
        </form>
      </div>
    </div>
  )
}

export default Register
