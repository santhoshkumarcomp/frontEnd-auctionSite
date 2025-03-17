import "./App.css";
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, Link, RouterProvider, BrowserRouter, } from "react-router-dom";
import UserRegistrationForm from "./UserRegistrationForm";
import LoginForm from "./LoginForm";
import Me from "./Me";
import UpdatePassword from "./UpdatePassword";

import GetAllPosts from "./GetAllPosts";
import Profile from "./Profile";
import GetPostById from "./GetPostById";
import DashBoardLayout from "./DashBoardLayout";
import CreatePost from "./CreatePost";

import Welcome from "./Welcome";
import axios from "axios";
import EditPost from "./EditPost";
import CategoryPosts from "./CategoryPosts";

export const AuthContext = createContext({ user: 'buyer', login: () => {},logged: false, logSetter: () => {} });

function App() {
  
  // const AuthContext = createContext('buyer');
  const [user,setUser] = useState('buyer');
  const [logged,setLogged] = useState(false);
 const logSetter = useCallback((value)=>{
  setLogged(value);
 },[]);
 
  const login = useCallback((value) => {
    setUser(value);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to the server to check if the user is logged in via the HTTP-only cookie
        const response = await axios.get('https://be-capstone-5rvf.onrender.com/auth/status', { withCredentials: true });
        if (response.data.loggedIn) {
          setLogged(true);
        } else {
          setLogged(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setLogged(false);
      }
    };
    checkAuthStatus();
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login,
    logged,
  logSetter
  }), [user, login,logged,logSetter]);
  
  const routes = [
    {path: "/",
      element:(<Welcome />)},
    {
      path: "/seller",
      element: (
        <DashBoardLayout  />

      ),
      children :[ 
        {
          path: "register",
          element: <UserRegistrationForm />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "createpost",
          element: <CreatePost />,
        },
        {
          path: "editpost",
          element: <EditPost />,
        },
        {
          path: "updatepassword",
          element: <UpdatePassword />,
        },
        {
          path: "posts",
          element: <GetAllPosts />,
        },
        {
          path: "post/:id",
          element: <GetPostById />,
        },
        {
          path: "postcat/:category",
          element: <CategoryPosts />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },]
    },{
      path: "/buyer",
      element: (
        <DashBoardLayout  />
      ),
      children :[ 
        {
          path: "register",
          element: <UserRegistrationForm />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        
        {
          path: "me",
          element: <Me />,
        },
        {
          path: "updatepassword",
          element: <UpdatePassword />,
        },
        {
          path: "posts",
          element: <GetAllPosts />,
        },
        {
          path: "post/:id",
          element: <GetPostById />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },]
    }
  ];
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return (
    <AuthContext.Provider value={contextValue} >
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
    </AuthContext.Provider>
  );
}

export default App;