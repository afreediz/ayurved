import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../../services/api'
import Center from '../../components/utilities/Center'
import Loader from '../../components/Loader'

const UserDetails = () => {
  const {email} = useParams()
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    async function getData(){
      try{
        const response = await API.get(`/users/admin-get-user/${email}`)
        setData(response.data.user)
        setLoading(false)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getData()
  },[])
  return (
    <Center className='my-10 relative'>
      <form className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <div className="my-2">
          <label className='block text-gray-700' htmlFor="name">Name</label>
          <input name='name' type="text" id='name' value={data && data.name} placeholder='Enter your name' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input name='email' type="text" id="email" value={data && data.email} placeholder='Enter your email' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Phone</label>
          <input name='phone' type="text" id="phone" value={data && data.phone} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="address">Address</label>
          <textarea rows={5} name='address' type="text" id="address" value={data && data.address} placeholder='Enter your address' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Status</label>
          <input name='status' type="text" id="status" value={data && data.status} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Phone verified</label>
          <input name='phone_verified' type="text" id="phone" value={data && data.ph_verified} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Role</label>
          <input name='role' type="text" id="role" value={data && data.role} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
      </form>
      
      {loading && <Loader />}
    </Center>
  );
}

export default UserDetails
