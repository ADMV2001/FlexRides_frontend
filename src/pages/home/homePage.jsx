import { Route, Routes } from "react-router-dom"
import CustomerHeader from "../../components/customerHeader"
import Home from "./home"
import Contact from "./contact"
import About from "./about"
import Gallery from "./gallery"
import Products from "./products"
import NotFoundError from "./error"
import ProductOverview from "./productOverview"
import BookingPage from "./bookingPage"

export default function HomePage(){

    return(
        <>
            <CustomerHeader/>
            <div className='w-full h-[calc(100vh-60px)] bg-white'>
               <Routes path="/*">
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/overview/:key" element={<ProductOverview/>} />
                <Route path="/booking" element={<BookingPage/>} />
                

                <Route path="/*" element={<NotFoundError/>} />
               </Routes>
            </div>
        </> 
        
    )
}