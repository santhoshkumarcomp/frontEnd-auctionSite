import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import imag from "./avatar.jpg";
import { useNavigate } from "react-router";
import { useContext } from 'react';
import { AuthContext } from './App';
import UpdatePic from "./UpdatePic";

const Me = () => {
  const { user,logged,logSetter,login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view,setView] = useState(false);
  const fromChild = ()=>{
    setView(false);
  }
  const fetchMe = async () => {
    try {
      const response = await axios.get(`https://be-capstone-5rvf.onrender.com/auth/${user}/me`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      toast.error("Failed to fetch user data");
      console.error("Error fetching user data:", error);
    } finally {
      console.log(userData)
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMe();
    }
  }, [view]);
  

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`https://be-capstone-5rvf.onrender.com/auth/${user}/logout`, {
        withCredentials: true,
      });
      
      toast.success("Logging Out", {
        onClose: () => {navigate("/");logSetter(false);
          login("");
          // window.relocation.reload();
          }

      });
    } catch (error) {
      toast.error("Logout failed");
      console.error("Error during logout:", error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {userData && (
        <div className="rounded-2xl flex flex-col items-center bg-white w-[90%] h-[450px] shadow-lg p-4">
          { logged ? (userData.picture && userData.picture.length > 0) ? <img 
            src={`https://be-capstone-5rvf.onrender.com/${userData.picture}`} 
            alt={userData.name} 
            className="rounded-full border mt-10 w-[200px] h-[200px] object-contain"
          />:<img 
            src={imag} 
            alt={userData.name} 
            className="rounded-full border mt-10 w-[200px] h-[200px] object-contain"
          />: null}
          <i onClick={() => setView(!view)} className="fa-solid fa-circle-plus hover:cursor-pointer"></i>
          {view && <UpdatePic  fromChild={fromChild}/>}
          <h1 className="rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 my-2 px-4 text-[22px] text-white">
            {userData.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">You are a {userData.role}</p>
          <button 
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:cursor-pointer bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Me;