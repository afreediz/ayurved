import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../context/user'
import { toast } from 'react-toastify'
import API from '../services/api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Center from '../components/utilities/Center'
import Loader from '../components/Loader'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Profile = () => {
  const [data, setData] = useState("")
  const [oldPh, setOldPh] = useState("")
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState(false)
  
  useEffect(()=>{
    async function getData(){
      try{
        const response = await API.get('users/profile')
        setData(response.data.user)
        setOldPh(response.data.user.phone)
        setLoading(false)
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
      setData(response.data.user)
      setOldPh(response.data.user.phone)
      toast.success(response?.data.message)
      setUpdated(false)
    }catch(error){
      toast.error(error.response?.data.message)
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
  // const [deleteacc, setDeleteAcc] = useState(false)
  // const deleteAccount = async() => {
  //   try{
  //     const response = await API.delete('users/profile')
  //     localStorage.removeItem("token")
  //     setUser(null)
  //     navigate('/login')
  //     toast.success(response?.data.message)
  //   }catch(error){
  //     toast.error(error.response?.data.message)
  //     console.log(error);
  //   }
  // }
  const sendVerificatioCode = async() => {
    toast.warn("Sending verification code...")
    try{
      const response  = await API.post('/users/sendVerificationCode')
      setIsVerifying(true)
      toast.success(response?.data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error);
    }
  }

  const verifyCode = async() => {
    if(verificationCode.length != 6) return alert("Code is atleast 6 digits long")
    try{
      const response = await API.post('/users/verifyCode', {
        code: verificationCode
      })
      setData((user)=>{
        return {
          ...user,
          ph_verified:true
        }
      })
      setVerificationCode("")
      setIsVerifying(false)
      toast.success(response?.data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error);
    }
  }
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <Center className='max-w-4xl mx-auto'>
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex">
            <Link to={'/profile'} className="flex-1">
              <div className="py-4 text-center bg-indigo-600 text-white font-medium">
                Profile
              </div>
            </Link>
            <Link to={'/orders'} className="flex-1">
              <div className="py-4 text-center text-gray-600 hover:bg-gray-50 transition-colors">
                Orders
              </div>
            </Link>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
            <p className="text-gray-600 mt-1">Manage your account information</p>
          </div>
          
          <form onSubmit={(e)=>e.preventDefault()} className="p-6">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="name">
                  Full Name
                </label>
                <input 
                  name='name' 
                  onChange={onchange} 
                  type="text" 
                  id='name' 
                  value={data && data.name} 
                  placeholder='Enter your name' 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    name='email' 
                    disabled 
                    type="text" 
                    id="email" 
                    value={data && data.email} 
                    placeholder='Enter your email' 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" 
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                    Cannot be changed
                  </span>
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  {/* <input name='phone' onChange={onchange} type="text" id="phone" value={data && data.phone} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" /> */}
                  <PhoneInput 
                    country={'in'} 
                    value={`${data.phone}`} 
                    onChange={(phone)=>{
                      setData((old_data)=>{
                        setUpdated(true)
                        return {
                          ...old_data,
                          phone
                        }
                      })
                    }} 
                    containerClass="phone-input-container"
                    inputClass="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    buttonClass="phone-dropdown-button"
                  />
                  {data && !data.ph_verified && (
                    <button 
                      type="button" 
                      onClick={sendVerificatioCode}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>

              {/* Verification Code Input */}
              {isVerifying && (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code" 
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button 
                      type="button"
                      onClick={verifyCode}
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <textarea 
                  rows={4} 
                  name='address' 
                  onChange={onchange} 
                  type="text" 
                  id="address" 
                  value={data && data.address} 
                  placeholder='Enter your complete address' 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none" 
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button 
                  type='submit' 
                  onClick={onsubmit} 
                  disabled={!updated} 
                  className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                    updated 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {updated ? 'Save Changes' : 'No Changes'}
                </button>
                {/*<button type='button' onClick={()=>{setDeleteAcc(true)}} className='py-2 px-5 mx-4 bg-red-600 text-white font-medium rounded-lg' >
                  Delete Account
                </button>*/}
              </div>
            </div>
          </form>
        </div>

        {/* deleteacc && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black p-5 shadow-lg border border-gray-800 text-white opacity-70 flex flex-col justify-center items-center text-center text-lg">
          <h3 className='font-medium'>Warning : This action is irreversible</h3>
          <p>Are you sure you want to delete your account? Account will be deleted permanently.</p>
          <div className="mt-5">
            <button onClick={deleteAccount} className='py-2 px-5 mx-4 bg-red-700 text-white font-medium rounded-lg' >
              Yes
            </button>
            <button onClick={()=>{setDeleteAcc(false)}} className='py-2 px-5 mx-4 bg-green-700 text-white font-medium rounded-lg' >
              No
            </button>
          </div>
        </div>*/}
        {loading && <Loader />}
      </Center>
    </div>
  );
}

export default Profile