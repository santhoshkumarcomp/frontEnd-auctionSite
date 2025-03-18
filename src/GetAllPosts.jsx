import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router";
import "./GetAllPosts.css"
import { AuthContext } from "./App";



const GetAllPosts = () => {
  const {user,logged} = useContext(AuthContext);
  const [feedPosts,setFeedPosts] = useState({});
  const [options,setOptions] = useState('traditional');
  const [loading, setLoading] = useState(true);


  const handleChange = (e)=>{
 const {value} = e.target;
 console.log(typeof(value));
 setOptions(value);
  }

  useEffect(() => {
    const fetchAllPosts = async () => {
      console.log(user)
      console.log(`Logged value :${logged}`);
      setLoading(true);
      const response = await axios.get(`https://be-capstone-5rvf.onrender.com/${user}/post/getposts`, { withCredentials: true });
      console.log(response.data);
      setFeedPosts(response.data);
      setLoading(false);
    };

    fetchAllPosts();
  }, []);

 

  return (
    <div className="flex flex-col  items-center ">
      <div className="flex flex-col items-center  w-[720px] text-gray ">
      <div className='flex flex-col my-[10px] border-gray-500 drop-shadow-md focus:border-white-500'>
        <label>Options:</label>
        <select className='w-[500px] my-[10px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all'
        name="options"
        value={options}
        onChange={handleChange}
        >
        
        <option className='text-gray-500' value="traditional">Traditional</option>
        <option className='text-gray-500' value="reverse">Reverse</option>
        <option className='text-gray-500' value="sealed">Sealed</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        feedPosts &&
        feedPosts.sellerPosts.filter(post =>  post.options == options)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
          <div key={post._id} className= 'flex flex-col  my-[10px] py-[40px] rounded-lg bg-white   bg-opacity-50 drop-shadow-2xl px-2 text-gray w-[720px]'>
            <h1 className="text-center text-[32px] ">{post.title}</h1>
            <div className="py-[10px] border rounded-sm border-gray-300 h-[175px] content ">
            <h4 className=" text-justify text-gray-700/75 px-[10px] text-[21px]">{post.content}</h4>
            </div>
            <img className="my-[10px] drop-shadow-md" src={`https://be-capstone-5rvf.onrender.com/${post.picture}`} alt={`${post.title}`} />
            <div><span>${post.initialPrice}</span>  {user=='buyer' ? <span className="border border-red-500"> {post.closed?<span>Post is closed</span>:<span>Post is open for bids</span>}</span>:null}</div>
            <div className="flex flex-col items-center">
            <Link className='bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] drop-shadow-md hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600' to={`/seller/post/${post._id}`}>View Post</Link>
            
            </div>
            <span className="flex place-content-between"><span className="text-[18px] text-blue-400 ">Posted on {post.createdAt.split('T')[0]}</span> <span className="text-[18px] text-blue-400 "> Time: {post.createdAt.split('T')[1].split('Z')[0].split(":")[0]}:{post.createdAt.split('T')[1].split('Z')[0].split(":")[1]}</span></span>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default GetAllPosts