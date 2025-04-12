import { Link } from "react-router-dom"

export default function ProductCard(props){

    const vehicle = props.vehicle

    return(
        <div className="w-[280px] h-[380px] m-[10px] bg-white shadow-md rounded-2xl p-4 transition-transform hover:scale-105 fle">
        <img
            src={vehicle.image[0] || "https://via.placeholder.com/280"}
            alt={vehicle.name}
            className="w-full h-[160px] object-cover rounded-[5px]"
        />
        <div className="mt-3 h-[150px]">
            <h2 className="h-[50px] mb-[2px] text-lg font-bold text-gray-800">{vehicle.name}</h2>
            <p className="h-[20px] text-sm text-gray-500">{vehicle.category}</p>
            <p className="h-[30px] text-xs text-gray-600 mt-1">{vehicle.description}</p>
            <div className="flex justify-between items-center mt-2">
            <span className="text-blue-600 font-bold text-lg mb-[3px]">LKR {vehicle.price}/day</span>
            <span
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                vehicle.isAvailable ? "bg-green-200 text-green-700" : "bg-red-100 text-red-600"
                }`}
            >
                {vehicle.isAvailable ? "Available" : "Not Available"}
            </span>
            </div>
            
        </div>
        <Link to={"/overview/"+vehicle.key} className="w-[245px] h-[27px] bg-blue-300 rounded-[7px] mt-[7px] text-blue-800 font-semibold px-5 py-1">View Details</Link>
    </div>
    )
}
