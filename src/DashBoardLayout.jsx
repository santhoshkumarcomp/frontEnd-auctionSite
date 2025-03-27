import { Link, Outlet, useNavigate } from "react-router"
import "./DashBoardLayout.css"
import importImg from './5911.jpg';
import Me from "./Me";
import { useContext } from "react";
import { AuthContext } from "./App";
import axios from "axios";



const DashBoardLayout = () => {
  const { user, logged } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRefresh = async (e) => {
    e.preventDefault;
    const response = await axios.get('https://be-capstone-5rvf.onrender.com/seller/post/closedposts', { withCredentials: true });
    console.log(response.data);
    navigate("/seller/posts");
    alert("Refreshed");

  }


  return (<div className="flex">
    {logged && <div className=" sticky rounded-xl min-h-screen flex-[0.2] flex flex-col border border-gray-500 bg-white drop-shadow-lg text-[21px] bg-opacity-25">
      <div className="  hover:cursor-pointer hover:bg-opacity-50"><Link to={`/${user}/posts`}><img src={importImg} className="w-[90px] h-[80px] inline" ></img><h1 className="inline align-center   julius-sans-one-regular font-extrabold">AUCTION's</h1></Link></div>
      <div className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-house"></i><span className="relative left-1/5 text-gray-500"><Link to={`/${user}/posts`}>Home</Link></span></div>
      {user === "seller" ? (<>
        <div className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-square-plus"></i><span className="relative left-1/5 text-gray-500"><Link to={"/seller/createpost"}>Create Post</Link></span></div>
        <div onClick={handleRefresh} className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-dharmachakra"></i><span className="relative left-1/5 text-gray-500">Refresh</span></div></>) :
        // <div className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-square-plus"></i><span className="relative left-1/5 text-gray-500"><Link to={"/buyer/posts"}>History</Link></span></div>
        null}

      {/* <div className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-rotate-left"></i><span className="relative left-1/5 text-gray-500">Reverse</span></div>
      <div className=" border rounded-sm border-dashed border-orange-500 p-[10px] m-[10px] flex align-center items-center hover:cursor-pointer hover:bg-yellow-100"><i className="fa-solid fa-envelope-circle-check"></i><span className="relative left-1/5 text-gray-500">Sealed</span></div>     */}

    </div>}
    <div className={`flex-[0.6] min-h-screen flex items-center justify-center ${!logged ? '!flex-[1]' : '!flex-[0.6]'}`}><Outlet /></div>
    {logged && <div className="flex-[0.2]  flex flex-col items-center m-1 p-[10px] bg-white-400 h-[360px]  "><Me /></div>}
  </div>
  )
}

export default DashBoardLayout

