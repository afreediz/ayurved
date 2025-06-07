import React, { useEffect, useState } from 'react'
import Center from '../components/utilities/Center'
import axios from 'axios'
import { Link } from 'react-router-dom'
import API from '../services/api'
import Loader from '../components/Loader'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const fetchBlogs = async () => {
            const { data } = await API.get('/blogs')
            setBlogs(data.blogs)
            setLoading(false)
        }
        fetchBlogs()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 py-20">
                <div className="absolute inset-0 bg-black opacity-10"></div>
               
                <Center className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto px-4">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Read Our  Blogs
                        </h2>
                        <p className="text-xl md:text-2xl text-green-50 font-light leading-relaxed">
                            Discover the ancient wisdom of Ayurveda through our carefully crafted articles
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-green-300 to-emerald-300 mx-auto rounded-full"></div>
                    </div>
                </Center>
            </div>

            <Center className='py-16'>
                {blogs && blogs.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <p className='text-2xl text-gray-600 font-light text-center py-10'>No blogs found</p>
                        <p className="text-gray-500 mt-2">Check back soon for new articles!</p>
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 container max-w-7xl mx-auto'>
                    {blogs && blogs.map((blog, index) => (
                        <Link 
                            key={index} 
                            to={`/blogs/${blog.slug}`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="group block"
                        >
                            <div className={`relative bg-white rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${
                                hoveredCard === index 
                                    ? 'shadow-2xl shadow-green-500/20' 
                                    : 'shadow-lg hover:shadow-xl'
                            } border border-gray-100 flex flex-col min-h-[400px]`}>
                                
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                                    <img 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    
                                    {/* Floating Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                            Health & Wellness
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-green-600/80 via-green-600/20 to-transparent transition-opacity duration-300 z-20 ${
                                        hoveredCard === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">Read Article</span>
                                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 leading-tight mb-3 group-hover:text-green-600 transition-colors duration-300">
                                            {blog.title}
                                        </h3>
                                        
                                        {/* Meta Information */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Ayurvedic Wisdom</span>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    {/* Read More Button */}
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors duration-300">
                                            Explore Benefits →
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-green-200 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
                                            <div className="w-2 h-2 bg-green-300 rounded-full group-hover:bg-green-500 transition-colors duration-300"></div>
                                            <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-600 transition-colors duration-300"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Border Animation */}
                                <div className={`h-1 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ${
                                    hoveredCard === index ? 'w-full' : 'w-0'
                                }`}></div>
                            </div>
                        </Link>
                    ))}
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader />
                    </div>
                )}

              
            </Center>
        </div>
    )
}

export default Blogs