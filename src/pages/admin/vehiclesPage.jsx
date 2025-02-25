import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AdminVehiclesPage(){
    return(
        <div className='w-full h-full bg-blue-50 relative'>
            <Link to='/admin/vehicles/add'>
                <IoIosAddCircle className='text-[60px] text-blue-600 flex absolute right-[25px] bottom-[25px] hover:text-green-400 cursor-pointer'/>
            <IoIosAddCircle className='text-[60px] text-blue-600 flex absolute right-[25px] bottom-[25px] hover:text-green-400 cursor-pointer'/>
            </Link>
            
        </div>
    )
}