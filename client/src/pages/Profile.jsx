import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../context/user'
import { toast } from 'react-toastify'
import API from '../services/api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Center from '../components/utilities/Center'

const Profile = () => {
  const location = useLocation()
  console.log(location.pathname);
  const [data, setData] = useState("")
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useContext(userContext)
  useEffect(()=>{
    async function getData(){
      try{
        const response = await API.get('users/profile',{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        setData(response.data.user)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getData()
  },[])
  const onsubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await API.put('users/profile', {
        ...data
      })
      toast.success(response?.data.message)
      setUpdated(false)
    }catch(error){
      throw error
    }
  }
  const onchange = (e) => {
    setUpdated(true)
    const {name, value} = e.target;
    setData((old_data)=>{
      return {
        ...old_data,
        [name]:value
      }
    })
  }
  const deleteAccount = async() => {
    try{
      const userConfirm = window.confirm('Are you sure you want to delete your account?')
      if(!userConfirm) return
      const response = await API.delete('users/profile')
      localStorage.removeItem("token")
      setUser(null)
      navigate('/login')
      toast.success(response?.data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error);
    }
  }
  return (
    <Center className='my-10'>
      <div className="md:hidden mt-10 w-full flex justify-around text-xl font-semibold border border-gray-800 relative">
        <Link to={'/profile'}><span className="py-2 text-gray-800">Profile</span></Link>
        <span className="border-l-2 border-gray-800 h-full absolute left-1/2 transform -translate-x-1/2"></span>
        <Link to={'/orders'}><span className="py-2 text-gray-400">Orders</span></Link>
      </div>
      <form onSubmit={onsubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <div className="my-2">
          <label className='block text-gray-700' htmlFor="name">Name</label>
          <input name='name' onChange={onchange} type="text" id='name' value={data && data.name} placeholder='Enter your name' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input name='email' onChange={onchange} type="text" id="email" value={data && data.email} placeholder='Enter your email' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Phone</label>
          <input name='phone' onChange={onchange} type="text" id="phone" value={data && data.phone} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="address">Address</label>
          <input name='address' onChange={onchange} type="text" id="address" value={data && data.address} placeholder='Enter your address' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <button type='submit' disabled={!updated} className={`py-2 px-5 ${updated ? "bg-green-600" : "bg-gray-300"} text-white font-medium rounded-lg`} >
          Update
        </button>
        <button type='button' onClick={deleteAccount} className='py-2 px-5 mx-4 bg-red-600 text-white font-medium rounded-lg' >
          Delete Account
        </button>
      </form>
    </Center>
  );
}

export default Profile
