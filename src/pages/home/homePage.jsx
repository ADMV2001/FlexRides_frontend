import { Route, Routes } from "react-router-dom"
import CustomerHeader from "../../components/customerHeader"
import Home from "./home"
import Contact from "./contact"
import About from "./about"
import Gallery from "./gallery"
import Vehicles from "./vehicles"
import NotFoundError from "./error"

export default function HomePage(){

    return(
        <>
            <CustomerHeader/>
            <div className='w-full h-[calc(100vh-60px)] bg-blue-50'>
               <Routes path="/*">
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/vehicles" element={<Vehicles/>} />
                <Route path="/*" element={<NotFoundError/>} />
               </Routes>
            </div>
        </> 
        
    )
}