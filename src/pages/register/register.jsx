import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')

    const navigate = useNavigate()

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        console.log(firstName, lastName, email, password, address, mobile)

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, { firstName, lastName, email, password, address, mobile })
        .then((res) => {
            toast.success(res.data.message || 'Registration Success!');
            navigate('/login');
        })
        .catch((err) => {
            console.error(err.response?.data);
            toast.error(err.response?.data?.message || 'Registration failed!');
        });

    }

    return(
        <div className='bg-picture w-full h-screen bg-blue-200 flex justify-center items-center'>
            <form onSubmit={handleOnSubmit}>
                <div className='w-[450px] h-[500px] bg-white/30 backdrop-blur-3xl rounded-xl flex justify-center items-center flex-col relative'>

                <img src="./logo.png" alt="logo" className=' w-[150px] h-[150px] absolute top-1' />    

                <input 
                    type="text"
                    name="firstName" 
                    placeholder="First Name" 
                    className='w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[100px]'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[10px]"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}  
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[10px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[10px]" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[10px]"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}   
                />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    className="w-[350px] h-[30px] bg-transparent border-b border-white text-white text-sm outline-none mt-[10px]"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}  
                />

                <button className='w-[350px] h-[40px] bg-blue-500 rounded-[5px] mt-[40px] font-bold text-white cursor-pointer transition-transform active:scale-110'
                type="submit">
                    Register
                </button>
                <span className='mt-[10px] text-white text-[13px]'>I have an account? <Link to="/login" className='text-blue-700 hover:underline font-semibold'>Login Here</Link></span>
                </div>
            </form>
        </div>
    )
}