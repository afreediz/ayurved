import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import CreateProduct from './CreateProduct';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProductTable = () => {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/`)
        setProducts(data.products)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getProducts()
  },[])
  const handleDelete = async (id) => {
    try{
      const {data} = await API.delete(`products/${id}`)
      setProducts((prev)=>prev.filter((product)=>product._id !== id))
      toast.success(data.message)
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div className="relative">
        <h1>All products</h1>
        <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex justify-end px-8">
          <button onClick={()=>setDisplayAdd(!displayAdd)} className="py-3 px-6 bg-green-600  text-white font-bold rounded">Add product</button>
        </div>
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
          <table className="bg-white min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Index
                </th>
                <th scope="col" className=" hidden md:table-cell px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length > 0 && products.map((product, index) => (
                <tr key={index} className="">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index+1}</td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">{product._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={()=>navigate(`/navjeevanabrand/admin/products/${product.slug}`)} className="text-green-600 hover:text-green-900 mr-2">View</button>
                    <button onClick={()=>handleDelete(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
        </div>
      </div>
    </div>
    <div className="w-full">
    {displayAdd && <CreateProduct setProducts={setProducts} setDisplayAdd={setDisplayAdd} />}
    </div>
    </div>
  );
};

export default ProductTable;
