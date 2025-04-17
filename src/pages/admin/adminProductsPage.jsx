import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const [productLoaded, setProductLoaded] = useState(false)//these simple variables can be passed into the useEffect's empty array 

    const navigate = useNavigate();

    useEffect(()=>{

        if(!productLoaded){
            const token = localStorage.getItem('token')

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            axios.get(`${backendUrl}/api/products/getProducts`,{
                headers: {"Authorization" : "Bearer " + token}
            }).then((res)=>{
                console.log(res.data)
                setProducts(res.data)
                setProductLoaded(true)
            }).catch((err)=>{
                console.log('Error details:', err.response?.data || err.message)
            })
            }  
    }, [productLoaded] );

    function handleDelete(key){
        console.log(key)
        if(window.confirm('Are you sure you want to delete this product?')){

            const token = localStorage.getItem('token')
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            axios.delete(`${backendUrl}/api/products/deleteProduct/` + key, {
                headers: {"Authorization" : "Bearer " + token}
            }).then((res)=>{
                console.log(res.data)
                setProductLoaded(false)
                toast.success(res.data.message)
            }).catch((err)=>{
                console.log('Error details:', err.response?.data || err.message)
            }
        )}
    }

    return (
        <div className="w-full h-full bg-gray-50 p-6 flex flex-col items-center">
            {!productLoaded && <div className="my-[5px] bg-0 w-[30px] h-[30px] border-b-[4px] border-blue-600 animate-spin rounded-full"></div>}
            {productLoaded && <div className="w-full max-w-5xl bg-white shadow-md rounded-xl overflow-x-scroll">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold border-b border-gray-200 ">
                        <tr>
                            <th className="py-3 px-4">Product Key</th>
                            <th className="py-3 px-4">Product Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Availability</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
    
                    <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <tr key={product.key} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4">{product.key}</td>
                                <td className="py-3 px-4 font-medium">{product.name}</td>
                                <td className="py-3 px-4">LKR {product.price}</td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                            product.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {product.isAvailable ? "Available" : "Not Available"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 flex gap-2 justify-center">
                                    <button 
                                    className="text-blue-600 bg-blue-200 rounded-[8px] pl-[7px] pr-[7px] pt-[3px] pb-[4px] hover:text-blue-700 text-sm font-medium transition-transform active:scale-110"
                                    onClick={()=>{
                                        navigate('/admin/products/update', {state: {product: product}})
                                    }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600  bg-red-200 rounded-[8px] pl-[7px] pr-[7px] pt-[3px] pb-[4px] hover:text-red-700 text-sm font-medium transition-transform active:scale-110"
                                        onClick={() => handleDelete(product.key)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
    
            <Link to="/admin/products/add">
                <IoIosAddCircle className="text-[50px] text-blue-500 absolute right-6 bottom-6 hover:text-green-400 cursor-pointer transition-transform active:scale-110" />
            </Link>
        </div>
    );
    
    
}