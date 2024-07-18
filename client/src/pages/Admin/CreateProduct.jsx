import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';
import { solution_eg } from '../../datas';
import { IoMdAdd, IoMdClose } from "react-icons/io";

const CreateProduct = ({setDisplayAdd, setProducts}) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    solutions: [],
    shortdesc: '',
    description: '',
    quantity:''
  });
  console.log(product);

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await API.get('/category')
        const res = await API.get('/solutions')
        setCategories(data.categories)
        setSolutions(res.data.solutions)
      } catch (error) {
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getCategories();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data} = await API.post('products', {...product, image})
      setProducts((prev)=>[...prev, {...data.product,category:categories.find((category)=>category._id === product.category)}])
      setDisplayAdd(false)
      toast.success(data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center bg-gray-100">
      <div className="w-full p-8 pt-0 bg-gray-100">
        <div className="flex justify-between items-center">
          <i></i>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-1">Create Product</h1>
          <IoMdClose className='text-2xl' onClick={() => setDisplayAdd(false)} />
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="quantity"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            Solutions :
              <div className="flex gap-3">
                {
                  solutions.map((solution, index)=>{
                    if(product.solutions.includes(solution._id)){
                      return(
                        <span
                          key={index}
                          type="button"
                          onClick={() => setProduct({ ...product, solutions: product.solutions.filter((item) => item !== solution._id) })}
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
                          onClick={() => setProduct({ ...product, solutions: [...product.solutions, solution._id] })}
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
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="shortDesc">Short Description</label>
            <textarea
              id="shortDesc"
              name="shortdesc"
              value={product.shortdesc}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short Description"
              rows="2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="longDesc">Long Description</label>
            <textarea
              id="longDesc"
              name="description"
              value={product.ddescriptionesc}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Long Description"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="imageFile">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              name="image"
              onChange={handleFileChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;