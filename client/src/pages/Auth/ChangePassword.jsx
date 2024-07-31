import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Center from '../../components/utilities/Center';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useParams()
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
     try{
      const response = await API.post('auth/change-password', {
        password:newPassword, token
      })
      toast.success(response.data.message)
      navigate('/login')
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <Center className="my-10 max-w-[700px]">
        <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Change Password
          </button>
        </form>
      </div>
    </Center>

  );
};

export default ChangePassword;
