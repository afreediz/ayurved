import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../services/api'
import {toast} from 'react-toastify'
import slugify from 'slugify'
import { solution_eg } from '../../datas'
import { IoMdAdd, IoMdClose } from "react-icons/io";

const AdminProductDetails = () => {
    const [product, setProduct] = useState()
    const [categories, setCategories] = useState([])
    const [solutions, setSolutions] = useState([])
    const [updateable, setUpdateable] = useState(false)
    const [image, setImage] = useState(null);
    const [old_image, setOldImage] = useState(null);
    const navigate = useNavigate()
    console.log(product);
    console.log(solutions);
    const { slug } = useParams()
    useEffect(()=>{
        async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        const res = await API.get('/solutions')
        setSolutions(res.data.solutions)
        setImage(data.product.image)
        setOldImage(data.product.image)
        setProduct(data.product)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    const getCategories = async () => {
        try {
            const { data } = await API.get('/category')
            setCategories(data.categories)
        } catch (error) {
          toast.error(error.response?.data.message)
          console.log(error)
        }
    }
    getProduct()
    getCategories()
  },[])

  const onChange = (e) => {
    setUpdateable(true)
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async () => {
    try{
      const {data} = await API.delete(`products/${product._id}`)
      navigate('/admin/products')
      toast.success(data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      const {data} = await API.put(`products/${product._id}`, {
        ...product, image, old_image
      })
      navigate(`/admin/products/${slugify(product.name)}`)
      setUpdateable(false)
      toast.success(data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  const handleFileChange = (e) => {
    setUpdateable(true)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className='grid grid-cols-1 gap-4 p-8 bg-white'>
      <div className="image bg-gray-200 w-full flex justify-center items-center relative">
        <div className=" absolute w-full h-full bg-transparent opacity-0 hover:bg-black hover:opacity-60 z-10 transition-all flex justify-center items-center hover:backdrop-blur-lg">
            {/* <input type='file' onChange={handleFileChange} className="outline border-none outline-1 outline-white p-4 hover:outline-red-900 hover:text-red-900 bg-transparent text-white text-center" placeholder='choose an image' /> */}
            <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the actual input element
        />
        <label htmlFor="file" className="custom-file-upload">
          <div className="outline border-none outline-1 outline-white p-4 hover:outline-red-500 hover:text-red-500 bg-transparent text-white text-center">
            choose an image
          </div>
        </label>
        </div>
        <img src={product && image ? image :"https://via.placeholder.com/150"}  alt={product && product.name} className="max-w-[50vh] rounded-lg shadow-lg" />
      </div>
      <div className="">
        <input onChange={(e)=>(
          onChange(e)

        )} name="name" value={product && product.name} className=" bg-transparent border-none outline-none text-4xl font-bold mb-4" />
        <div className=" flex items-center text-2xl font-semibold mb-4">$<input onChange={onChange} name="price" type='number' value={`${product && product.price}`} className="bg-transparent border-none outline-none"/></div>
        <div className="">
          <span>quantity</span>
          <input onChange={onChange} name="quantity" value={product && product.quantity} className="  border outline-none w-full mt-2 bg-transparent inline"/>
        </div>
        <div className="">
          <span>Short Description</span>
        <input onChange={onChange} name="shortdesc" value={product && product.shortdesc} className="  border outline-none w-full text-lg mb-8 bg-transparent"/>
        </div>
        <div className="">
          <span>Description</span>
          <textarea onChange={onChange} rows={5} cols={50} name="description" value={product && product.description} className="  border outline-none w-full text-lg mb-8 bg-transparent p-2" />
        </div>
        <select onChange={onChange} name="category" value={product && product.category._id} className="border outline-slate-500 w-[50%] text-lg my-2 bg-transparent">
          <option className=' bg-gray-900 p-2 text-white' value={product && product.category._id}> { product && product.category.name}</option>
          {categories && categories.map((category) => (
            <option  className=' bg-gray-900 p-2 text-white' key={category.name} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="my-4 flex gap-3">
          {
                  solutions.map((solution, index)=>{
                    // console.log( product.solutions.map(solution => solution._id));
                    if(product.solutions.map(solution => solution._id).includes(solution._id)){
                      return(
                        <span
                          key={index}
                          type="button"
                          onClick={() =>{
                             setProduct({ ...product, solutions: product.solutions.filter((item) => item._id !== solution._id) })
                              setUpdateable(true)
                            }}
                          className="inline-flex my-2 items-center gap-1 p-2 border border-slate-500 rounded cursor-pointer"
                        >
                          {solution.name}
                          <IoMdClose />
                        </span>
                      )
                    }else{
                      return(
                        <span
                          key={index}
                          type="button"
                          onClick={() =>{
                             setProduct({ ...product, solutions: [...product.solutions, solution] })
                              setUpdateable(true)
                            }}
                          className="inline-flex my-2 items-center gap-1 p-2 border border-slate-500 rounded cursor-pointer"
                        >
                          {solution.name}
                          <IoMdAdd />
                        </span>
                      )
                    }
                  })
                }
        </div>
        {product && product.highlighted ? (
          <span onClick={() => {
            setProduct({ ...product, highlighted: false })
            setUpdateable(true)
            }} className="inline-flex my-2 items-center gap-1 p-2 border border-slate-500 rounded cursor-pointer bg-blue-500 text-white">
            Highlighted
          </span>
        ) : (
          <span
            type="button"
            onClick={() => {
              setProduct({ ...product, highlighted: true })
              setUpdateable(true)
            }}
            className="inline-flex my-2 items-center gap-1 p-2 border border-slate-500 rounded cursor-pointer"
          >
            Highlight
          </span>
        )}
        <div className=" flex flex-col">
          <span>Associated Blog : </span>
          <textarea className='  border outline-none w-full text-lg mb-8 bg-transparent p-2' rows={10} cols={50} value={product && product.contents} onChange={(e) => setProduct((prev)=>{
            setUpdateable(true)
            return {...prev, contents: e.target.value}
          })} placeholder='Enter Contents' />
        </div>
        <div className="button-container flex gap-4">
          <button onClick={handleUpdate} disabled={!updateable} className={`py-2 px-4 ${updateable ? 'bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300' : 'bg-gray-500 text-white cursor-not-allowed font-medium rounded-lg'}`}>Update </button>
          <button onClick={handleDelete} className='py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300'>Delete </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetails