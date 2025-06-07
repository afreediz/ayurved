import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link, useParams } from 'react-router-dom';
import Center from '../components/utilities/Center';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const BlogDetails = () => {
    const { slug } = useParams()
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const { data } = await API.get(`/blogs/${slug}`)
                setBlog(data.blog);
                setLoading(false);
            }
            fetchPosts();
        }
        catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }
    }, [slug]);

    // Function to strip HTML tags and styles, keeping only text content
    const stripHtmlAndStyles = (html) => {
        if (!html) return '';
        
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Remove all style attributes
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach(el => {
            el.removeAttribute('style');
            el.removeAttribute('class');
        });
        
        return tempDiv.innerHTML;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <Loader />
                </div>
            )}

            {blog && (
                <>
                    {/* Hero Section */}
                    <div className="relative overflow-hidden  bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
                            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-xl"></div>
                        </div>
                        <Center className="relative z-10">
                            <div className="max-w-4xl mx-auto px-4 text-center">
                                <div className="mb-6">
                                    <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                                        Health & Wellness
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    {blog.title}
                                </h1>
                              
                            </div>
                        </Center>
                    </div>

                    <Center>
                        <div className="max-w-4xl mx-auto px-4  relative z-10">
                            {/* Featured Image */}
                            <div className="relative mb-12">
                                <div className="bg-white rounded-2xl p-4 ">
                                    <img 
                                        src={blog.image} 
                                        className='w-full object-contain max-h-96 rounded-xl' 
                                        alt={blog.title} 
                                    />
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
                                {/* Article Meta */}
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">A</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">Ayurveda Expert</p>
                                            <p className="text-sm text-gray-500">Health & Wellness Writer</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                       
                                        <a href="https://www.facebook.com/share/v/1BasjvrLPb/?mibextid=wwXIfr" target='_blank' rel='noreferrer'>
                                         <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-300">
                                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </button>
                                        </a>
                                       
                                      
                                    </div>
                                </div>

                                {/* Blog Content with Custom Styling */}
                                <div 
                                    className="prose prose-lg max-w-none
                                        prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mb-4
                                        prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-6
                                        prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-green-700
                                        prose-h3:text-2xl prose-h3:leading-snug prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-green-600
                                        prose-h4:text-xl prose-h4:leading-snug prose-h4:mt-4 prose-h4:mb-2
                                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
                                        prose-a:text-green-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-green-700 hover:prose-a:underline
                                        prose-strong:text-gray-900 prose-strong:font-semibold
                                        prose-em:text-gray-600 prose-em:italic
                                        prose-ul:my-4 prose-ul:pl-0
                                        prose-ol:my-4 prose-ol:pl-0
                                        prose-li:my-2 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-2
                                        prose-li:marker:text-green-500
                                        prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:bg-green-50 prose-blockquote:italic prose-blockquote:text-green-800
                                        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
                                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                                        prose-table:border-collapse prose-table:border prose-table:border-gray-300 prose-table:my-6
                                        prose-thead:bg-green-50
                                        prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-green-800
                                        prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
                                        prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                                        prose-hr:border-green-200 prose-hr:my-8"
                                    dangerouslySetInnerHTML={{ __html: stripHtmlAndStyles(blog.content) }}
                                />
                            </div>

                            {/* Call to Action */}
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white mb-12">
                                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Health?</h3>
                                <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                                    Discover more Ayurvedic wisdom and premium health products to support your wellness journey.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/allproducts">
                                    <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors duration-300 shadow-lg">
                                        Explore Products
                                    </button></Link>
                                    <Link to="/blog">
                                    <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300">
                                        Read More Blogs
                                    </button>
                                    </Link>
                                </div>
                            </div>

                           
                        </div>
                    </Center>
                </>
            )}
        </div>
    );
};

export default BlogDetails;