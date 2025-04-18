import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import MobileMenu from "./mobileMenu";

export default function CustomerHeader(){

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const token = localStorage.getItem("token");

    return(
        <header className='w-full h-[50px] shadow-xl flex justify-center items-center relative' >
            <img src="/logo1.png" alt="logo" className='w-[40px] h-[40px] object-cover absolute left-1.5 rounded-full'/>
            <h1 className='font-bold text-[23px] absolute left-[55px]'>SOUND STUDIO</h1>
            <Link to="/home" className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2'>Home</Link>
            <Link to="/contact" className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2'>Contact</Link>
            <Link to="/about" className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2'>About</Link>
            <Link to="/Gallery" className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2'>Gallery</Link>
            <Link to="/products" className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2'>Products</Link>
            
            {token!= null && <button className='hidden md:block md:text-[16px] font-semibold text-[20px] m-2 bg-gray-500 px-[5px] py-[2px] rounded-sm text-white absolute right-[45px] cursor-pointer'
                onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.href = "/login"
                }}
            >Logout</button>}
            <Link to="/booking" className=" absolute right-[50px] md:right-[30px]"> <FaCartShopping/></Link>

            <TfiMenuAlt onClick={()=>{setMobileMenuOpen(true)}} className="absolute right-[20px] md:hidden"/>
            <MobileMenu isOpen={mobileMenuOpen} setOpen={setMobileMenuOpen}/>
            
        </header>
    )
}