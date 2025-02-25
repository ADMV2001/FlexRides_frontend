import axios from "axios";
import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CustomerHeader from "../../components/customerHeader";

export default function LoginPage(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleOnSubmit(e) {
        e.preventDefault() //to prevent the page from refreshing
        console.log(email, password)
    
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", {
                email: email,
                password: password
            })
            console.log(res)
            toast.success('Login Success')

            const user = res.data.user

            localStorage.setItem('token', res.data.token)//saving the user's token in the local storage
            
            if(user.userRole === "admin"){
                navigate('/admin/')
            }else if(user.userRole === "customer"){
                navigate('/')
            }else {
                toast.error('Invalid user!')
            }
            
        } catch (err) {
            console.log('Error details:', err.response?.data || err.message)
            toast.error('Login failed')
        }
    }

    return(
        <div className='bg-picture w-full h-screen bg-blue-200 flex justify-center items-center'>
           <form onSubmit={handleOnSubmit}> 
            <div className='w-[400px] h-[400px] bg-white/30 backdrop-blur-md  bg-opacity-100 rounded-xl flex justify-center items-center flex-col relative'>
                
                <img src="./logo.png" alt="logo" className=' w-[150px] h-[150px] absolute top-1' />

                <input type="email" placeholder="Email" className='w-[300px] h-[30px] bg-transparent border-b border-white text-white 
                text-sm outline-none mt-[90px]' value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />

                <input type="password" placeholder="Password" className='w-[300px] h-[30px] bg-transparent border-b-1 border-white text-white 
                text-sm outline-none mt-[10px]' value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />

                <button className='w-[300px] h-[40px] bg-blue-500 rounded-[5px] mt-[40px] font-bold text-white cursor-pointer'>
                    Login
                </button>
                <span className='mt-[10px] text-white text-[13px]'>Don't have an account? <Link to="#" className='text-blue-600 hover:underline'>Signup Here</Link></span>    
            </div>       
           </form>  
        </div>
    )
}