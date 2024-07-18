import React from 'react'
import Header from './Admin/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Admin/Sidebar'

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12 min-h-80vh h-auto bg-slate-100">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 p-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
