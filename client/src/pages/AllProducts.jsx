import React, { useEffect, useState } from 'react'
import Center from '../components/utilities/Center'
import API from '../services/api'
import { toast } from 'react-toastify'
import ProductCard from '../components/utilities/ProductCard'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [query, setQuery ] = useState("")
    useEffect(()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
        async function getProducts(){
        try{
            const {data} = await API.get(`products/list/${page}`)
            setProducts(data.products)
            setLoading(false)
        }catch(error){
            toast.error(error.response?.data.message)
            console.log(error)
        }
        }
        getProducts()
    },[page])
  return (
    <Center className="my-8">
      <form className="form" onSubmit={(e)=>{
        e.preventDefault()
        navigate('/search/'+query)
        }}>
        <input type="text" placeholder='search ' onChange={(e)=>setQuery(e.target.value)} className="border-none outline outline-slate-200 rounded w-full text-2xl p-3" />
      </form>
      <h1>All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {products && products.length === 0 && <div className="text-gray-700 font-bold text-2xl">No products</div>}
        {products && products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-8">
      {page > 1 && (
        <button
          onClick={() => { 
            setPage(page - 1); 
            window.scrollTo({
              top:0,
              behavior:"smooth"
            })
          }}
          className="border-2 border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
        >
          Prev
        </button>
      )}
      <span className="text-2xl text-gray-500 px-4 py-2">Page: {page}</span>
      {products && products.length === 8 && (
        <button
          onClick={() => {
            setPage(page + 1); 
              window.scrollTo({
                top:0,
                behavior:"smooth"
              })
            }}
          className="text-2xl text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          Next
        </button>
      )}
      </div>
      {loading && <Loader />}
    </Center>
  )
}

export default AllProducts
