import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider"

export default function VehicleOverview(){

    const params = useParams() //to get the key from the url
    console.log(params)
    const key = params.key //get the key from the url

    const [loading, setLoading] = useState("loading")
    const [product,setProduct] = useState({})

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getOneProduct/${key}`).then((res)=>{
            setProduct(res.data);
            setLoading("loaded")
            console.log(res.data)
        }).catch((err)=>{
            console.log('Error details:', err.response?.data || err.message)
            setLoading("error")
        })
    },[])

    return(
        <div className="w-full h-full flex justify-center ">
            {
                loading === "loading" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50px] h-[50px] border-b-4  border-b-blue-600 animate-spin rounded-full"></div>
                </div>
            }
            {
                loading === "loaded" && <div className="w-full h-full flex justify-center items-center">
                    
                    <div className="w-[49%] h-full bg-white">
                        <ImageSlider images={product.image}/>
                    </div>

                    <div className="w-[49%] h-full bg-white flex flex-col p-10">
                        <h1 className="text-3xl font-bold text-blue-400">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-700">{product.category}</h2>
                        <p>{product.description}</p>
                        <p className="text-lg font-bold text-blue-700">LKR {product.price}.00</p>
                    </div>
                </div>
            }
            {
                loading === "error" && <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Error loading vehicle details...</h1>
                </div>
            }
        </div>
    )
}