import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import API from '../../services/api';
import Center from '../../components/utilities/Center';
import { Link } from 'react-router-dom';
import { FaRegWindowClose, FaWindowClose } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const CkeditorComponent = ({setActive}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

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
        const res = await API.post('/blogs', {title, content, image})
    }catch(error){
        console.log(error.data?.message)
    }
  };

  return (
    <div className=' absolute inset-0 bg-white min-h-[70vh] h-auto p-5'>
      <div className="flex justify-between">
        <h2>Create a Blog Post</h2>
        <IoMdClose className='text-3xl' onClick={() => setActive(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange}  />
        </div>
        <div>
          <label>Content:</label>
          <CKEditor
            editor={ClassicEditor}
            onInit={ editor => {
              console.log( 'Editor is ready to use!', editor );
            } }
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log("CHECK ", data)
              setContent(data);
            }}
          />
        </div>
        <button className='text-white bg-blue-500 py-2 px-4 my-2' type="submit">Save Post</button>
      </form>
    </div>
  );
};

const ReadBlogs = ({setActive}) => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
      const fetchBlogs = async () => {
        const { data } = await API.get('/blogs')
        setBlogs(data.blogs)
      }
      fetchBlogs()
  },[])
  return (
    <Center className='my-4'>
        <div className="flex justify-between">
          <h2>Read Our Blogs</h2>
          <button className='text-white bg-green-600 py-2 px-4 my-2' onClick={() => setActive(true)}>Create Blog</button>
        </div>
        {blogs && blogs.length === 0 && <p className='text-2xl text-center py-10'>No blogs found</p>}
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
    </Center>
  )
}


const Blogs = () => {
  const [active, setActive] = useState(false);
  return (
    <div className='relative'>
      <ReadBlogs setActive={setActive} />
      {active && <CkeditorComponent setActive={setActive} />}
    </div>
  );
};

export default Blogs;
