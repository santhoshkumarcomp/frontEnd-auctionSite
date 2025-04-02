import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "./App";

import BidHistory from "./BidHistory";



const GetPostById = () => {
  const {user} = useContext(AuthContext);
  const [post, setPost ] = useState({});
  const [bidHistory, setBidHistory] = useState([]);
  const {id} = useParams();
  const [price, setPrice] = useState(false);
  const navigate = useNavigate();
  const priceRef = useRef(null);
  
  useEffect(()=>{
    // if(user === 'buyer') {priceRef.current.focus()} ;
    const fetchPostById = async()=>{
      const response = await axios.get(`https://be-capstone-5rvf.onrender.com/seller/post/postbyid/${id}`,{withCredentials: true,});
      console.log(response.data);
      setPost(response.data.post);
      
      setBidHistory(response.data.priceHistory);
    }
    fetchPostById();

  },[id,price])
const handleDelete = async()=>{
  const response = await axios.delete(`https://be-capstone-5rvf.onrender.com/seller/post/postbyid/${id}`,{withCredentials:true,})
  console.log(response.data);
  navigate(`/seller/posts`);
  
}
const handleEdit = ()=>{
  navigate(`/seller/editpost`, { 
    state: { 
      id: post._id,
      title: post.title,
      content: post.content,
      initialPrice: post.initialPrice
    } 
  });
}
const handleChange = (e) => {
  const { value } = e.target;
  priceRef.current = value;
};
const handleBid =async(options)=>{
  const bidPrice = Number(priceRef.current);
  if(options == "sealed"){
    const response = await axios.post(`https://be-capstone-5rvf.onrender.com/buyer/post/buyerbid/${id}`,{"options":options,"price" : bidPrice},{withCredentials : true})
    alert(response.data); 
    priceRef.current = "0";
  setPrice(!price);
    return;
  }
if(options == "reverse"){
    const response = await axios.patch(`https://be-capstone-5rvf.onrender.com/buyer/post/buyerbid/${id}`,{"options":options,"price" : bidPrice},{withCredentials : true})
    console.log(response.data); 
    alert(response.data); 
    priceRef.current = "0";
  setPrice(!price);
    return;
  }
  const response = await axios.put(`https://be-capstone-5rvf.onrender.com/buyer/post/buyerbid/${id}`,{"price" : bidPrice},{withCredentials : true})
  console.log(response.data); 
  alert(response.data); 
  priceRef.current = "0";
  setPrice(!price);
  
  
  
}

  return (
    <div className=" bg-white flex rounded-2xl  flex-col justify-center p-[15px] items-center min-h-screen mt-[30px] mx-[15px] ">
      <div className="flex flex-col items-center w-[720px]  p-6 text-[42px] rounded-lg shadow-md"> DETAILED VIEW</div>
        <div key={post._id}></div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <h4 className="text-lg mb-4">{post.content}</h4>
          <img className="w-[720px] mb-4 object-fill" src={`https://be-capstone-5rvf.onrender.com/${post.picture}`} alt={`${post.title}`}  />
          <p className="text-xl font-semibold mb-4">${post.initialPrice}</p>
          
         { user==="seller" ? <div className="flex justify-around w-full mb-4 text-[21px]">
            <button className="bg-blue-400 opacity-75 hover:cursor-pointer w-[200px] py-[15px] drop-shadow-md rounded-md hover:bg-green-400" onClick={handleEdit}>Edit</button>
            <button className="bg-blue-400 opacity-75 hover:cursor-pointer w-[200px] py-[15px] drop-shadow-md rounded-md hover:bg-rose-700" onClick={handleDelete}>Delete</button>
          </div> :(<div className=' flex flex-col items-center'>
        <label>Bid Price:</label>
        <input className='text-[21px] border-black-500 my-[10px] my-[10px] w-[500px] drop-shadow-md rounded-md  bg-slate-100 shadow-2xl block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 outline-white placeholder:text-gray-400 focus:outline-inherit sm:text-sm/6'
        type="number"
        name="initialPrice"
        defaultValue={price}
        onChange={handleChange}
        ref={priceRef}
        />
        {post.closed ?null:<button className=' bg-rose-500 opacity-75 rounded-xl w-[250px] my-[20px] drop-shadow-md hover:cursor-pointer text-blue py-[15px] hover:opacity-100 bg-rose-600' onClick={()=>handleBid(post.options)}><h2>Bid Post</h2></button> }
      
      </div>) }
          <BidHistory bidHistory={bidHistory} options={post.options} />
          
        </div>
     
  )
}

export default GetPostById