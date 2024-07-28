import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';
import Center from '../components/utilities/Center';
import Loader from '../components/Loader';

const BlogDetails = () => {
    const {slug} = useParams()
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    try{
        const fetchPosts = async () => {
          const { data } = await API.get(`/blogs/${slug}`)
          console.log(data);
          setBlog(data.blog);
          setLoading(false);
        }
        fetchPosts();
    }
    catch(error){
        console.log(error)
    }
  }, []);

  return (
    <Center>
        <div className="container mx-auto my-10">
          <h1>{blog && blog.title}</h1>
            {blog &&  <img src={blog.image} className='w-full object-contain max-h-[60vh]' alt={blog.title} />}
            {blog && <div className='my-5 font-sans text-lg' dangerouslySetInnerHTML={{ __html: blog.content }}></div>}
        </div>
        {loading && <Loader />}
    </Center>
  );
};

export default BlogDetails;