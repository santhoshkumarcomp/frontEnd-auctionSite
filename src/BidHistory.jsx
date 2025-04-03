// import axios from "axios";
import imag from "./avatar.jpg";
import {  useState } from "react";
// import { AuthContext } from "./App";

const BidHistory = ({bidHistory,options}) => {
  // const { user } = useContext(AuthContext);
  // const [userData, setUserData] = useState(null);
  // const [pic,setPic] = useState(null);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  },2000); 

  return (
    <>{options != "sealed" ?(<><h5 className="text-xl font-semibold mb-4">TOP BIDDERS</h5>
          
      <div className="flex flex-col items-center justify-center bg-slate-50 shadow-2xl overflow-auto border-black shadow-2xl text-xl w-[500px] h-[150px]">
     {  loading ?<p>Loading...</p>:(bidHistory.length > 0 ? bidHistory.map((bid, index) => (
         <div key={index} className="flex items-center space-x-4 py-2">{(bid.buyerName.picture && bid.buyerName.picture.length > 0) ? <img 
                     src={`https://be-capstone-5rvf.onrender.com/${bid.buyerName.picture}`} 
                     alt={bid.buyerName.name} 
                     className="rounded-full border w-[50px] h-[50px] object-contain"
                   />:<img 
                     src={imag} 
                     alt={bid.buyerName.name} 
                     className="rounded-full border w-[50px] h-[50px] object-contain"
                   />}
         
         <p className="text-[24px]">{bid.buyerName.name}<span> Price ${bid.biddingPrice}</span></p>

         </div>)) : <p>None of them Bidded</p>)}
      </div></>):null}</>
  )
}

export default BidHistory