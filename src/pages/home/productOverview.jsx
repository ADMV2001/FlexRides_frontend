import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider"
import { addToCart, loadCart } from "../../utils/cart"
import toast from "react-hot-toast"

export default function ProductOverview(){

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
        <div className="w-full h-full flex justify-center pt-[20px] font-[poppins]">
            {
                loading === "loading" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50px] h-[50px] border-b-4  border-b-blue-600 animate-spin rounded-full"></div>
                </div>
            }
            {
                loading === "loaded" && <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
                    <h1 className="text-3xl font-bold text-blue-400 text-center text-[20px] pb-[20px] md:hidden">{product.name}</h1>
                    <div className="w-full md:w-[49%] h-full bg-white ">
                        <ImageSlider images={product.image}/>
                    </div>

                    <div className="w-full md:w-[49%] h-[400px] p-2 bg-white flex flex-col gap-y-0.5">
                        <h1 className="text-3xl font-bold text-blue-400 hidden md:block md:mb-[20px]">{product.name}</h1>
                        <h2 className="text-[15px] font-semibold text-gray-700">{product.category} category</h2>
                        <p className="mt-2 text-[12px]">{product.description}</p>
                        <p className="text-lg font-semibold text-blue-700 mt-[10px]">LKR {product.price.toFixed(2)}</p>
                        <button className="w-[150px] md:w-[130px] mt-4 bg-blue-600 text-white px-4 p-1 rounded-md"
                                onClick={()=>{
                                    addToCart(product.key, 1)
                                    console.log(loadCart())
                                    toast.success("Added to cart!")
                                }}        
                        >
                            Add to Cart
                        </button>
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