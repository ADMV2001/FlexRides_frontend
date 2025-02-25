import { Link } from "react-router-dom";

export default function NotFoundError(){
    return(
        <div className='flex justify-center item-center relative'>
            <h1 className='text-[50px] font-bold text-blue-500 absolute top-[220px] left-[460px]'>404 Page Not Found</h1>
            <Link to='/home' className='flex absolute top-[300px] bg-blue-600 p-[5px] pr-[12px] pl-[12px] text-white rounded-[10px]'>Back to Home</Link>
        </div>
    )
}