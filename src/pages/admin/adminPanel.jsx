import { MdSpaceDashboard } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { Link, Route, Routes } from "react-router-dom";
import AdminVehiclesPage from "./adminVehiclesPage";
import AddVehicle from "./addVehicle";
import UpdateVehicle from "./updateVehicle";

export default function AdminPanel(){

    return(
        <div className="w-full h-screen flex">
             <div className="w-[250px] h-full bg-blue-500">
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  < MdSpaceDashboard/>
                  Dashboard
                </button>
                <Link to="/admin/bookings" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaBookmark/>
                  Bookings
                </Link>
                <Link to="/admin/vehicles" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaCar/>
                  Vehicles
                </Link>
                <Link to="/admin/reviews" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <MdRateReview/>
                  Reviews
                </Link>
                <Link to="/admin/users" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaUserGear/>
                  Users
                </Link>
                <div className="w-[220px] h-[300px] mb-0 bg-blue-200 flex fixed bottom-3 ml-[15px] rounded-xl justify-center">hello</div>
        
              </div>
        
              <div className="w-[calc(100vw-250px)] bg-blue-100">
                <Routes path="/*">
                  <Route path="/bookings" element={<h1>Booking Page</h1>} />
                  <Route path="/vehicles" element={<AdminVehiclesPage/>} />
                  <Route path="/vehicles/add" element={<AddVehicle/>} />
                  <Route path="/vehicles/update" element={<UpdateVehicle/>} />
                  <Route path="/reviews" element={<h1>Reviews Page</h1>} />
                  <Route path="/users" element={<h1>Users Page</h1>} />
                </Routes>
              </div>
            </div>
    )
}