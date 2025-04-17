import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Products(){

    const [vehicles, setVehicles] = useState([])
    const [state, setState] = useState("loading")//loading, success, error

    useEffect(()=>{
        if(state=="loading"){
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts`).then((res)=>{
                console.log(res.data)
                setVehicles(res.data)
                setState("success")
            }).catch((err)=>{
                console.error(err)
                toast.error('Error fetching vehicles')
            })
        }     
    }, [state]);

    return(
        <div className="w-full h-full flex flex-wrap justify-center pt-[40px]">
            {
                state=="loading" && 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[30px] h-[30px] border-b-[4px] border-blue-600 animate-spin rounded-full"></div>

                </div>
            }

            {
                state=="success" &&
                vehicles.map((vehicle)=>{
                    return(
                        <ProductCard key={vehicle.key} vehicle={vehicle}/>
                    )
                })
            }
        </div>
    )
}