import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';


const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;
  
  const [fileUploaded, setFileUploaded] = useState(false);
      const [formData, setFormData] = useState(post);
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  
      const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        if (!formData.title || !formData.content || !formData.initialPrice || !formData.options || !formData.picture) {
          toast.error("Please fill all fields including image");
          return;
        }
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        const response = await axios.put(`https://be-capstone-5rvf.onrender.com/seller/post/postbyid/${formData.id}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response)
        const notify = () => toast.success("Post edited");
        notify();
        navigate(`/seller/post/${formData.id}`)
        
        
  
      };
  
      return (<div className=" mt-[30px] flex flex-col items-center">
        <ToastContainer />
        <div className= 'py-[60px] rounded-lg bg-white backdrop-blur-xl  bg-opacity-50 drop-shadow-2xl px-2 text-gray-800 w-[720px]'>
        <form className="flex flex-col text-[21px] items-center   " onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input className='text-[24px] border-white-500 w-[500px] my-[10px] py-[10px] drop-shadow-md rounded-md bg-[#94d2bd] block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 outline-white placeholder:text-gray-400 focus:outline-inherit sm:text-sm/6"'
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea className=' border-white-500 w-[500px] h-[150px] bg-opacity-75 pt-2 drop-shadow-md rounded-md bg-[#94d2bd] block min-w-0 grow pr-3 pl-1 text-base text-gray-800 outline-white placeholder:text-gray-400 focus:outline-inherit  vertical-align-top resize-none text-[19px]'
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label>Initial Price:</label>
          <input className='text-[21px] border-white-500 my-[10px] my-[10px] w-[500px] drop-shadow-md rounded-md  bg-[#94d2bd] block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 outline-white placeholder:text-gray-400 focus:outline-inherit sm:text-sm/6'
          type="number"
          name="initialPrice"
          value={formData.initialPrice}
          onChange={handleChange}
          />
        </div>
        <div className='flex flex-col my-[10px] border-gray-500 drop-shadow-md focus:border-white-500'>
          <label>Options:</label>
          <select className='w-[500px] my-[10px]'
          name="options"
          value={formData.options}
          onChange={handleChange}
          >
          <option className='text-gray-500' value="traditional">Traditional</option>
          <option className='text-gray-500' value="reverse">Reverse</option>
          <option className='text-gray-500' value="sealed">Sealed</option>
          </select>
        </div>
        
        <div className='flex '>
          <label>Upload Picture:</label>
          <input className={`bg-blue-400 opacity-75 hover:cursor-pointer w-[112px] drop-shadow-md rounded-md hover:cursor-pointer ${
            fileUploaded ? '!bg-green-400' : '' // Change color when file is uploaded
          }`}
        
          type="file"
          name="picture"
          onChange={(e) => {
            const file = e.target.files[0];
            if (e.target.files.length > 0) {
              setFileUploaded(true); // File is uploaded
            } else {
              setFileUploaded(false); // No file uploaded
            }
            setFormData({
            ...formData,
            picture: file,
            });
          }}
          />
        </div>
        <button className='bg-rose-500 opacity-75 rounded-xl w-[250px] my-[20px] drop-shadow-md hover:cursor-pointer text-blue py-[15px] hover:opacity-100 bg-rose-600' type="submit"><h2>Edit Post</h2></button>
        </form>
        </div>
        <Link to={"/seller/posts"} className='bg-rose-500 opacity-75 rounded-xl w-[250px] my-[20px] drop-shadow-md hover:cursor-pointer text-center text-[21px] py-[15px] hover:opacity-100 bg-rose-600' > Get all posts</Link></div>
      );
    };


export default EditPost