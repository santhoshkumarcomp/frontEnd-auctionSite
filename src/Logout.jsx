import axios from "axios";


const Logout = () => {
  const handleLogout = async(e)=>{
        e.preventDefault();
        const response = await axios.get('https://be-capstone-5rvf.onrender.com/auth/seller/logout',{
          withCredentials: true,
        });
        alert(response.data);

  }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout