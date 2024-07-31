import React from 'react'
import './loader.css'
const Loader = () => {
  return (
    <div className='text-3xl fixed inset-0 bg-white flex items-center justify-center z-[1000]'>
      <div className="text-center">
        <img src="/images/name.jpeg" alt="Logo" className="mb-3 mx-auto w-44 md:w-64" />
        <div className="flex justify-center space-x-2">
          <div className="dot bg-gray-800"></div>
          <div className="dot bg-gray-800"></div>
          <div className="dot bg-gray-800"></div>
          <div className="dot bg-gray-800"></div>
          <div className="dot bg-gray-800"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
