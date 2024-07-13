import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await API.post('auth/forget-password', {
        email
      })
      toast.success(response.data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter your email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              Email
            </label>
            <input
              type="email"
              id="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>

  );
};

export default ForgetPassword;
