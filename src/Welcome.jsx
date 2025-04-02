import { useNavigate } from "react-router";
import { AuthContext } from './App';
import { useContext } from "react";
// import importImg from './5911.jpg';

const Welcome = () => {
  const navigate = useNavigate();
   
   const {  login } = useContext(AuthContext);
  
  return (
   <div>
    <div className="flex flex-col items-center  hover:cursor-pointer hover:bg-opacity-50"><h1 className=" align-center text-[64px]   julius-sans-one-regular font-extrabold">AUCTION's</h1></div>
    <div className="grid grid-cols-2  justify-center items-center min-h-screen max-w-6xl mx-auto gap-8">
           <div className=" flex flex-col rounded-full justify-center items-center place-content-evenly h-[500px] w-[500px] bg-white shadow-2xl">
             <h1 className="block  text-[52px]">Buyer</h1>
             <button onClick={()=>{login("buyer");
              navigate('buyer/register')
             }} className="bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] shadow-2xl hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600" >register</button>
             <button onClick={()=>{
              login("buyer");
             navigate('buyer/login');
             }
             } className="bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] shadow-2xl hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600" >login</button>
             </div>
             <div className=" flex flex-col rounded-full justify-center items-center place-content-evenly h-[500px] w-[500px] bg-white shadow-2xl">
             <h1 className="block  text-[52px]">Seller</h1> 
             <button onClick={()=>{login("seller");
              navigate('/seller/register');
             }} className="bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] shadow-2xl hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600" >register</button>
             <button onClick={()=>{login("seller");
              navigate('/seller/login');
             }} className="bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] shadow-2xl hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600" >login</button>
             </div>
           </div>
   </div>
  )
}

export default Welcome