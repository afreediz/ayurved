import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";

const CreateItem = ({setDisplayAdd, createHandler}) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    createHandler(name)
  }

  return (
    <div className="absolute inset-0 flex justify-center bg-gray-100">
      <div className="w-full p-8 pt-0">
        <div className="flex justify-between items-center">
          <i></i>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-1">Create </h1>
          <IoMdClose className='text-2xl cursor-pointer' onClick={() => setDisplayAdd(false)} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};


const Table = ({data, setData, updateHandler, deleteHandler, navigateTo}) => {
  return (
      <table className="min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Index
            </th>
            <th scope="col" className=" hidden md:block px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data.length !=0 ? data.map((item, index) => (
            <tr key={index} className="">
              <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium">{index+1}</td>
              <td className=" max-md:hidden px-6 py-4 whitespace-nowrap text-sm ">{item._id}</td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm ">
                <form action="" onSubmit={async(e)=>{
                  e.preventDefault()
                  updateHandler(item._id, item.name)
                }}>
                  <input className=' bg-transparent border-none outline-none' type="text" value={item.name} onChange={(e)=>{
                    setData((prev)=>{
                      return prev.map((prevItem)=>{
                        if(prevItem._id == item._id){
                          return {...prevItem, name: e.target.value}
                        }else{
                          return prevItem
                        }
                      })
                    })
                  }} />
                </form>
              </td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className=" flex gap-2">
                <button className="text-blue-600 hover:text-blue-900" onClick={()=>{navigateTo(item.slug)}}>view</button>
                <form action="" onSubmit={async(e)=>{
                  e.preventDefault()
                  deleteHandler(item._id)
                }}>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </form>
                </div>
              </td>
            </tr>
          )):<div className='p-5'> No Data Found</div>}
        </tbody>
      </table>
  );
}

const Categories = () => {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const navigateTo = (path) => {
    navigate('/category/'+path)
  }
  const createHandler = async(name) => {
    try {
      const { data } = await API.post('/category', {name});
      setCategories((prev)=>{
        return [data.category, ...prev]
      });
      setDisplayAdd(false)
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  const updateHandler = async(id, name) => {
    try{
      await API.put(`/category/${id}`, {
        name: name
      })
      toast.success("Category updated successfully")
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  const deleteHandler = async(id) => {
    try{
      await API.delete(`/category/${id}`)
      setCategories((prev)=>prev.filter((item)=>item._id != id))
      toast.success("Category deleted successfully")
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }

  useEffect(()=>{
    async function getCategory(){
      try{
        const res = await API.get("/category")
        setCategories(res.data.categories)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getCategory()
  },[])

  return (
    <div className='relative'>
      <h1 className="text-3xl font-semibold my-2">All Categories</h1>
      <div className="flex justify-end px-8 my-2">
        <button onClick={()=>setDisplayAdd(!displayAdd)} className="py-3 px-6 bg-green-600 text-white font-bold rounded">Add Category</button>
      </div>
      <Table data={categories} setData={setCategories} updateHandler={updateHandler} deleteHandler={deleteHandler} navigateTo={navigateTo} />
      <div className="">
        {displayAdd && <CreateItem createHandler={createHandler} setDisplayAdd={setDisplayAdd} />}
      </div>
    </div>
    
  );
}
const Solutions = () => {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [solutions, setSolutions] = useState([])
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate('/solutions/'+path)
  }
  const createHandler = async(name) => {
    try {
      console.log(name);
      const { data } = await API.post('/solutions', {name});
      setSolutions((prev)=>{
        return [data.solution, ...prev]
      });
      setDisplayAdd(false)
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  const updateHandler = async(id, name) => {
    try{
      await API.put(`/solutions/${id}`, {
        name: name
      })
      toast.success("Solution updated successfully")
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  const deleteHandler = async(id) => {
    try{
      await API.delete(`/solutions/${id}`)
      setSolutions((prev)=>prev.filter((item)=>item._id != id))
      toast.success("Solution deleted successfully")
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }

  useEffect(()=>{
    async function getSolutions(){
      try{
        const res = await API.get("/solutions")
        setSolutions(res.data.solutions)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getSolutions()
  },[])

  return (
    <div className='relative'>
      <h1 className="text-3xl font-semibold my-2">All Solutions</h1>
      <div className="flex justify-end px-8 my-2">
        <button onClick={()=>setDisplayAdd(!displayAdd)} className="py-3 px-6 bg-green-600 text-white font-bold rounded cursor-pointer">Add Solutions</button>
      </div>
      <Table data={solutions} setData={setSolutions} updateHandler={updateHandler} deleteHandler={deleteHandler} navigateTo={navigateTo} />
      <div className="">
        {displayAdd && <CreateItem createHandler={createHandler} setDisplayAdd={setDisplayAdd} />}
      </div>
    </div>
    
  );
}

const CatAndSoln = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Categories />
      <Solutions />
    </div>
  );
};

export default CatAndSoln;