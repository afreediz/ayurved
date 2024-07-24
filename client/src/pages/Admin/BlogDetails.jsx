import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Center from '../../components/utilities/Center';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import { FaCopy } from 'react-icons/fa';

const BlogDetails = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [old_image, setOldImage] = useState(null);
    const [updateable, setUpdateable] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await API.get(`/blogs/${slug}`);
                console.log(data);
                setBlog(data.blog);
                setOldImage(data.blog.image);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, [slug]);

    const handleFileChange = (e) => {
        setUpdateable(true);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBlog((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };
    const updateBlog = async () => {
        try {
            const { data } = await API.put(`/blogs/${blog._id}`, {...blog, old_image});
            setBlog(data.blog);
            navigate(`/admin/blogs/${data.blog.slug}`);
            toast.success("Blog Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    }
    const deleteBlog = async () => {
        try {
            const { data } = await API.delete(`/blogs/${blog._id}`);
            toast.success("Blog Deleted Successfully");
            navigate('/admin/blogs');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Center>
            <div className="container mx-auto my-10">
                <div className="flex justify-between items-center">
                    <h1>{blog && blog.title}</h1>
                    <h3 className='flex gap-2 items-center'>Blog Id : {blog && blog._id} <FaCopy onClick={() => {navigator.clipboard.writeText(blog._id)}} /> </h3>
                    <div>
                        <button 
                            onClick={() => { 
                                setUpdateable(false)
                                updateBlog()
                             }}
                            disabled={!updateable}
                            className={`mr-4 px-4 py-2 ${updateable ? "bg-blue-600" : "bg-gray-600 cursor-not-allowed"} text-white rounded`}
                        >
                            Update
                        </button>
                        <button className='mr-4 px-4 py-2 bg-red-600 text-white rounded' onClick={deleteBlog}>Delete</button>
                    </div>
                </div>
                <div className="relative max-h-[60vh] overflow-hidden">
                    <div className="absolute w-full h-full bg-transparent opacity-0 hover:bg-black hover:opacity-60 z-10 transition-all flex justify-center items-center hover:backdrop-blur-lg">
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Hide the actual input element
                        />
                        <label htmlFor="file" className="custom-file-upload">
                            <div className="outline border-none outline-1 outline-white p-4 hover:outline-red-500 hover:text-red-500 bg-transparent text-white text-center">
                                choose an image
                            </div>
                        </label>
                    </div>
                    <img
                        src={blog && blog.image ? blog.image : "https://via.placeholder.com/150"}
                        alt={blog?.name}
                        className="rounded-lg shadow-lg w-full max-h-[60vh] object-contain"
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={blog?.title}
                        onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={blog?.content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, data });
                            setUpdateable(true);
                            setBlog((prev) => ({ ...prev, content: data }));
                        }}
                    />
                </div>
            </div>
        </Center>
    );
};

export default BlogDetails;