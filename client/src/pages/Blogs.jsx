import React, { useEffect, useState } from 'react'
import Center from '../components/utilities/Center'
import axios from 'axios'
import { Link } from 'react-router-dom'
import API from '../services/api'
import Loader from '../components/Loader'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
          const { data } = await API.get('/blogs')
          setBlogs(data.blogs)
          setLoading(false)
        }
        fetchBlogs()
    },[])
  return (
    <Center className='my-4'>
        <h2>Read Our Blogs</h2>
        {blogs && blogs.length === 0 && <p className='text-2xl text-center py-10'>No blogs found</p>}
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 container'>
      {blogs && blogs.map((blog, index) => (
        <Link  key={index} to={`/blogs/${blog.slug}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[350px] max-h-[350px]">
              <div className="w-full h-48 overflow-hidden rounded flex-shrink-0 flex justify-center items-center">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold p-4">{blog.title}</h3>
          </div>
      </Link>
      ))}
    </div>
    {loading && <Loader />}
    </Center>
  )
}

export default Blogs
