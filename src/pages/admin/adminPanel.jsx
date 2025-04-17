import { MdSpaceDashboard } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./adminProductsPage";
import AddProduct from "./addProduct";
import UpdateVehicle from "./updateProduct";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingsPage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPanel(){

  //use this to prevent unauthorized user access to the admin page 
  const [userValidate, setUserValidate] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(!token){
      window.location.href = "/login";
    }
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getOneUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data)

      const user = res.data

      if(user.userRole !== "admin"){
        window.location.href = "/home";
      }
      else{
        setUserValidate(true);
      }

    }).catch((error) => {
      console.log(error);
      setUserValidate(false)
    })

  },[])

    return(
        <div className="w-full h-screen flex">
             <div className="w-[250px] h-full bg-blue-500">
                <button className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  < MdSpaceDashboard/>
                  Dashboard
                </button>
                <Link to="/admin/orders" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaBookmark/>
                  Orders
                </Link>
                <Link to="/admin/products" className='w-full h-[40px] text-white text-[20px] font-bold flex justify-center items-center'>
                  <FaCar/>
                  Products
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
                { userValidate &&
                  <Routes path="/*">
                  <Route path="/orders" element={<AdminOrdersPage/>} />
                  <Route path="/products" element={<AdminProductsPage/>} />
                  <Route path="/products/add" element={<AddProduct/>} />
                  <Route path="/products/update" element={<UpdateVehicle/>} />
                  <Route path="/reviews" element={<h1>Reviews Page</h1>} />
                  <Route path="/users" element={<AdminUsersPage/>} />
                </Routes>}
              </div>
            </div>
    )
}