import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'

const SearchProducts = () => {
    const [products, setProducts] = useState()
    const {query} = useParams()
    const [search, setSearch] = useState(query)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
    
  useEffect(()=>{
    async function getSearchResults(){
      if (!query) navigate('/allproducts')
        setSearch(query)
        try{
          const {data} = await API.get(`products/search/${query}`)
          setProducts(data.products)
          setLoading(false)
        }catch(error){
          toast.error(error.response?.data.message)
          console.log(error)
        }
    }
    getSearchResults()
  },[query])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <form className="form" onSubmit={(e)=>{
        e.preventDefault()
        if (!search) navigate('/allproducts')
        navigate('/search/'+search)
        }}>
        <input type="text" placeholder='search here...' value={search} onChange={(e)=>setSearch(e.target.value)} className="input input-bordered input-primary outline-none w-full text-2xl p-3" />
      </form>
      <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
            {products && products.length === 0 && <div className="text-gray-700 font-bold text-2xl">No products</div>}
            {products && products.map((product, index) => {
              return <ProductCard product={product} key={index} />
            })}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
  
}

export default SearchProducts
