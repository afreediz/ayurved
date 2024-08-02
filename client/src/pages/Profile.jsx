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
  const location = useLocation()
  const [data, setData] = useState("")
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useContext(userContext)
  const [loading, setLoading] = useState(true)
  console.log(data.phone);
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState(false)
  
  useEffect(()=>{
    async function getData(){
      try{
        const response = await API.get('users/profile')
        setData(response.data.user)
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
  const [deleteacc, setDeleteAcc] = useState(false)
  const deleteAccount = async() => {
    try{
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
    <Center className='my-10 relative'>
      <div className="md:hidden mt-10 w-full flex justify-around rounded text-xl border border-gray-800 relative">
        <Link to={'/profile'}><span className="py-2 text-gray-800">Profile</span></Link>
        <span className="border-l-2 border-gray-800 h-full absolute left-1/2 transform -translate-x-1/2"></span>
        <Link to={'/orders'}><span className="py-2 text-gray-400">Orders</span></Link>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <div className="my-2">
          <label className='block text-gray-700' htmlFor="name">Name</label>
          <input name='name' onChange={onchange} type="text" id='name' value={data && data.name} placeholder='Enter your name' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input name='email' disabled type="text" id="email" value={data && data.email} placeholder='Enter your email' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="phone">Phone</label>
          <div className="">
            {/* <input name='phone' onChange={onchange} type="text" id="phone" value={data && data.phone} placeholder='Enter your phone' className="w-full p-2 border border-gray-300 rounded-lg" /> */}
            <PhoneInput country={'in'} value={`${data.phone}`} onChange={(phone)=>{setData((old_data)=>{
              setUpdated(true)
              return {
                ...old_data,
                phone
              }
            })}} />
            {isVerifying && <><span className=' text-sm text-gray-700'>we have shared a verification code to your mobile number</span><div className=""><input type="number" value={verificationCode} onChange={(e)=>{setVerificationCode(e.target.value)}} placeholder='Enter verification code' className="my-2 p-2 border border-gray-300 rounded-lg" /> <button onClick={verifyCode} className={`px-4 py-2 rounded text-white bg-blue-500`}>Submit</button></div></>}
            {
            !isVerifying ? <button className={`px-3 py-1 my-1 rounded text-white font-bold ${data && data.ph_verified ? "bg-green-400 cursor-not-allowed" : "bg-blue-500"}`} disabled={data && data.ph_verified} onClick={sendVerificatioCode}>{data && data.ph_verified ? "Verified" : "Verify"}</button>:
            <button onClick={()=>{verifyCode()}} className={`px-4 py-1 rounded text-white "bg-blue-500"}`}>Verify Code</button>
            }
          </div>
        </div>
        <div className="my-2">
          <label className="block text-gray-700" htmlFor="address">Address</label>
          <textarea rows={5} name='address' onChange={onchange} type="text" id="address" value={data && data.address} placeholder='Enter your address' className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <button type='submit' onClick={onsubmit} disabled={!updated} className={`py-2 px-5 ${updated ? "bg-green-600" : "bg-gray-300"} text-white font-medium rounded-lg`} >
          Update
        </button>
        <button type='button' onClick={()=>{setDeleteAcc(true)}} className='py-2 px-5 mx-4 bg-red-600 text-white font-medium rounded-lg' >
          Delete Account
        </button>
      </form>
      { deleteacc && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black p-5 shadow-lg border border-gray-800 text-white opacity-70 flex flex-col justify-center items-center text-center text-lg">
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
      </div>}
      {loading && <Loader />}
    </Center>
  );
}

export default Profile
