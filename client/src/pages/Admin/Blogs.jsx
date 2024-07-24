import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import API from '../../services/api';

const CkeditorComponent = () => {
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
    <div>
      <h2>Create a Blog Post</h2>
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

const Blogs = () => {
  return (
    <div>
      <CkeditorComponent />
    </div>
  );
};

export default Blogs;
