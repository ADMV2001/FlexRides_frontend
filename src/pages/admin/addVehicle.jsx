import axios from 'axios';
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import mediaUpload from '../../utils/mediaUpload';

export default function AddVehicle(){

    const [key, setKey] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Sedan')
    const [vehicleImages, setVehicleImages] = useState([])

    const navigate = useNavigate()

    async function handleAddVehicle(e){
        e.preventDefault()

        const promises = [] //create an array to hold upload promises for files
        
        for(let i=0; i<vehicleImages.length; i++){
            console.log(vehicleImages[i]) 
            const promise = mediaUpload(vehicleImages[i]) 
            promises.push(promise)  //put every file that have been uploaded, to the promises array we declared above
        }


        if (!key || !name || !price || !description || !category) {
            toast.error("All fields are required");
            return;
        }

        console.log(key, name, price, description, category)

        const token = localStorage.getItem('token')

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        if(!token){
            toast.error('Please login first')
        }
        else{
            try{
                //Promise.all(promises).then((result)=>{
                //    console.log(result)
                //    toast.success("Images uploaded successfully")

                //}).catch((err)=>{
                //    console.log(err)
                //    toast.error("Error uploading images")
                //})

                const vehicleImageUrls = await Promise.all(promises);

                const res = await axios.post(`${backendUrl}/api/products/addProducts`, {
                    key : key,
                    name : name,
                    price : price,
                    description : description,
                    category : category,
                    image : vehicleImageUrls
                },
                {
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
                toast.error('Failed to add vehicle')
                }
            }
    }

    return (
        <div className="w-full h-screen bg-blue-100 flex flex-col justify-center items-center">
            <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-700 text-center">Add Vehicle</h2>
    
                <input 
                    type="text" 
                    placeholder="Identification Key" 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
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
                    onChange={(e) => setPrice(Number(e.target.value))}
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

                <input
                    type="file"
                    className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    multiple
                    onChange={(e)=>setVehicleImages(e.target.files)}
                /> 
    
                <button 
                    className="w-full mt-5 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                    onClick={handleAddVehicle}
                >
                    Add Vehicle
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