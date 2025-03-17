import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './App';


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user,logSetter } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Both fields are required!");
    } else {
      setError("");
      // Handle login logic here (e.g., API call to authenticate user)
      try{
      const response = await axios
        .post(`https://be-capstone-5rvf.onrender.com/auth/${user}/login`, {
          email: email,
          password: password,
        },{
          withCredentials: true,
        })

        console.log(response)
        if (user == 'seller'){
          const notify = () =>toast.success("Login successful", {
            onClose: () => { logSetter(true);
              navigate("/seller/posts")
              
            }
          });
          notify();

        }
        else if(user=='buyer'){
          const notify = () =>toast.success("Login successful", {
            onClose: () => { logSetter(true);
              navigate("/buyer/posts")
              // window.location.reload()
              
            }
          });
          notify();
        }
        
          
        
      }catch( error) {
          console.log(error);
          alert("Enter correct credentials");
      }
      
    }
  };
  // const handleForgotPassword = () => {
  //   axios
  //     .post("https://be-auth-pwd.onrender.com/auth/forgotPassword/", {
  //       email: email,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       alert(response.data);
  //       navigate("/updatepassword")
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <ToastContainer />
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className='flex flex-col items-center'>
          <button
            type="submit"
            className=' bg-rose-500 align-center opacity-75 rounded-xl w-[250px] my-[20px] drop-shadow-md hover:cursor-pointer text-center text-[21px] py-[15px] text-white hover:opacity-100 bg-rose-600'
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;