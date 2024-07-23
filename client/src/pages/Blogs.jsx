import React, { useEffect } from 'react'
import Center from '../components/utilities/Center'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const fetchBlogs = async () => {
          const { data } = await axios.get('/blogs')
          setBlogs(data)
        }
        fetchBlogs()
    })
  return (
    <Center className='my-4'>
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {blogs && blogs.map((blog, index) => {
        <Link to={`/blogs/${blog.slug}`}>
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[450px] max-h-[450px]">
            <div className="w-full h-48 mb-4 overflow-hidden rounded flex-shrink-0 flex justify-center items-center">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-contain" />
            </div>
                <h3 className="text-lg font-semibold mt-1">{blog.title}</h3>
            </div>
      </Link>
      })}
    </div>
    </Center>
  )
}

export default Blogs
