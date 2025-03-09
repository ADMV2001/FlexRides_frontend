import axios from 'axios';
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateVehicle(){
    const location = useLocation()
    console.log(location)

    const [key, setKey] = useState(location.state.product.key)
    const [name, setName] = useState(location.state.product.name)
    const [price, setPrice] = useState(location.state.product.price)
    const [description, setDescription] = useState(location.state.product.description)
    const [category, setCategory] = useState(location.state.product.category)

    const navigate = useNavigate()

    async function handleAddVehicle(e){
        e.preventDefault()

        if (!key || !name || !price || !description || !category) {
            toast.error("All fields are required");
            return;
        }

        console.log(key, name, price, description, category)

        const token = localStorage.getItem('token')

        if(!token){
            toast.error('Please login first')
        }
        else{
            try{
                const res = await axios.put('http://localhost:3000/api/products/updateProduct/'+location.state.product.key, {
                    name : name,
                    price : price,
                    description : description,
                    category : category
                },{
                    headers: {
                        Authorization : "Bearer " + token
                    }
                }
            );
            toast.success(res.data.message)
            navigate("/admin/vehicles")
            }
            catch(err){
                console.log('Error details:', err.response?.data || err.message)
                toast.error('Failed to update vehicle')
                }
            }
    }

    return (
        <div className="w-full h-screen bg-blue-100 flex flex-col justify-center items-center">
            <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-[30px] text-blue-700 text-center">Update Vehicle Details</h2>
    
                <input 
                    disabled
                    type="text" 
                    placeholder="Identification Key" 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-gray-200 font-bold text-gray-500"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
    
                <input 
                    type="text" 
                    placeholder="Vehicle Name" 
                    className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
    
                <input 
                    type="number" 
                    placeholder="Rental Price" 
                    className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
    
                <textarea 
                    placeholder="Description" 
                    className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
    
                <select className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value) }
                >
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Van">Van</option>
                    <option value="Luxury">Luxury</option>
                </select>
    
                <button 
                    className="w-full mt-7 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                    onClick={handleAddVehicle}
                >
                    Update Vehicle
                </button>
                <button 
                    className="w-full mt-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                    onClick={() => navigate("/admin/vehicles")}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
    
}