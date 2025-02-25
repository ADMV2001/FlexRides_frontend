import { useState } from "react";

export default function Test(){

    const [count, setCount] = useState(0)
    const [item, setItem] = useState('Items')

    return(
        <div className='w-full h-screen bg-blue-100 flex flex-col justify-center items-center'>
            <h1>{count} {item}</h1> 
            <button onClick={()=>{
                setCount(count+1)
            }}>Count</button>
        </div>
    );
}