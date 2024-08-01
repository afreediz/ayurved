import React, { useState, useEffect } from 'react';
import API, {format_date} from '../../services/api';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
const AllUsers = () => {
  const [users, setUsers] = useState()

  useEffect(()=>{
    async function getUsers(){
      try{
        const res = await API.get("users/all-users")
        setUsers(res.data.users)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getUsers()
  },[])
  const handlUserStatus = async(userId, newStatus) => {
    if (newStatus == "Delete"){
      try{
        await API.delete(`users/${userId}`)
        setUsers((prev)=>{
          return prev.filter((user)=>user._id !== userId)
        })
        return toast.success("user deleted successfully")
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }else{
      try{
        await API.put(`users/status/${userId}`, {status: newStatus})
        setUsers((prev)=>{
          return prev.map((user)=>user._id === userId ? {...user, status: newStatus} : user)
        })
        toast.success("User status updated successfully")
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
  };




  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">All Users</h1>
        <table className="min-w-full bg-white  divide-y divide-gray-600">
          <thead>
            <tr>
              <th className="hidden md:table-cell  px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Index</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joined Date</th>
              <th className="px-20 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
          {users && users.map((user,index) => (
            <tr key={user.id}>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">{index+1}</td>
              <Link to={`/navjeevanabrand/admin/users/${user.email}`} ><td className="px-6 py-4 whitespace-nowrap underline">{user.email}</td></Link>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{format_date(user.createdAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.status}
                  onChange={(e)=>{handlUserStatus(user._id, e.target.value)}}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="Delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
