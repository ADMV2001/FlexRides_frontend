import axios from 'axios';
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import mediaUpload from '../../utils/mediaUpload';

export default function UpdateVehicle(){
    const location = useLocation()
    console.log(location)

    const [key, setKey] = useState(location.state.product.key)
    const [name, setName] = useState(location.state.product.name)
    const [price, setPrice] = useState(location.state.product.price)
    const [description, setDescription] = useState(location.state.product.description)
    const [category, setCategory] = useState(location.state.product.category)
    const [vehicleImages, setVehicleImages] = useState([])

    const navigate = useNavigate()

    async function handleUpdateVehicle(e){
        e.preventDefault()

        let updatingImages = location.state.product.image //we get the backend location of the images from the product we are updating

        if(vehicleImages.length>0){
            
            const promises = [] //create an array to hold upload promises for files
                    
            for(let i=0; i<vehicleImages.length; i++){
                console.log(vehicleImages[i]) 
                const promise = mediaUpload(vehicleImages[i]) 
                promises.push(promise)  //put every file that have been uploaded, to the promises array we declared above
            }

            updatingImages = await Promise.all(promises);
        }

        console.log(key, name, price, description, category)

        const token = localStorage.getItem('token')
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        if(!token){
            toast.error('Please login first')
        }
        else{
            try{
                const res = await axios.put(`${backendUrl}/api/products/updateProduct/`+location.state.product.key, {
                    name : name,
                    price : price,
                    description : description,
                    category : category,
                    image : updatingImages
                },{
                    headers: {
                        Authorization : "Bearer " + token
                    }
                }
            );
            toast.success(res.data.message)
            navigate("/admin/products")
            }
            catch(err){
                console.log('Error details:', err.response?.data || err.message)
                toast.error('Failed to update product')
                }
            }
    }

    return (
        <div className="w-full h-screen bg-blue-100 flex flex-col justify-center items-center">
            <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-[30px] text-blue-700 text-center">Update Product Details</h2>
    
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
                    placeholder="Product Name" 
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
                    <option value="Speakers">Speakers</option>
                    <option value="Microphones">Microphones</option>
                    <option value="Mixers">Mixers</option>
                    <option value="Amplifiers">Amplifiers</option>
                    <option value="DJ Equipment">DJ Equipment</option>
                    <option value="Audio Interfaces">Audio Interfaces</option>
                    <option value="Cables & Accessories">Cables & Accessories</option>
                    <option value="Lighting & Effects">Lighting & Effects</option>
                    <option value="PA Systems">PA Systems</option>
                    <option value="Monitors">Monitors (Studio/Stage)</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Stands & Mounts">Stands & Mounts</option>
                    <option value="Instruments">Instruments</option>
                    <option value="Power Supplies & Adapters">Power Supplies & Adapters</option>
                    <option value="Recording Equipment">Recording Equipment</option>
                    <option value="Wireless Systems">Wireless Systems</option>
                    <option value="Live Sound Packages">Live Sound Packages</option>
                    <option value="Conference Audio Kits">Conference Audio Kits</option>
                </select>

                <input
                    type="file"
                    className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    multiple
                    onChange={(e)=>setVehicleImages(e.target.files)}
                /> 
    
                <button 
                    className="w-full mt-7 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                    onClick={handleUpdateVehicle}
                >
                    Update Product
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