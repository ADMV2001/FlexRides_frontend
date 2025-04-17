import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CustomerHeader(){
    return(
        <header className='w-full h-[60px] shadow-xl flex justify-center items-center relative' >
            <img src="/logo.png" alt="logo" className='w-[70px] h-[70px] object-cover absolute left-1.5'/>
            <h1 className='font-bold text-[30px] absolute left-[80px]'>AudioHub</h1>
            <Link to="/home" className='font-semibold text-[20px] m-2'>Home</Link>
            <Link to="/contact" className='font-semibold text-[20px] m-2'>Contact</Link>
            <Link to="/about" className='font-semibold text-[20px] m-2'>About</Link>
            <Link to="/Gallery" className='font-semibold text-[20px] m-2'>Gallery</Link>
            <Link to="/products" className='font-semibold text-[20px] m-2'>Products</Link>
            <Link to="/booking" className="absolute right-[50px]"> <FaCartShopping/></Link>
        </header>
    )
}