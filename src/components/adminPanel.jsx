import { MdSpaceDashboard } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";

export default function AdminPanel(){

    return(
        <div className="w-full h-screen flex">
              <div className="w-[300px] h-full bg-blue-400">
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  < MdSpaceDashboard/>
                  Dashboard
                </button>
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaBookmark/>
                  Bookings
                </button>
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaCar/>
                  Vehicles
                </button>
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <MdRateReview/>
                  Reviews
                </button>
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaUserGear/>
                  Users
                </button>
        
              </div>
        
              <div className="w-full">
                
              </div>
            </div>
    )
}