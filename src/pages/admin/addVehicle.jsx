import React, {useState} from 'react';

export default function AddVehicle(){

    const [key, setKey] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    return(
        <div className='w-full h-full bg-blue-100 relative flex justify-center items-center'>
            <form className='flex flex-col'>
                <input type="text" placeholder="Identification Key" onChange={(e)=>{
                    setKey(e.target.value)
                }}/>

                <input type="text" placeholder="Vehicle Name" onChange={(e)=>{
                    setName(e.target.value)
                }} />

                <input type="text" placeholder="Rental Price" onChange={(e)=>{
                    setPrice(e.target.value)
                }} />

                <input type="text" placeholder="Description" onChange={(e)=>{
                    setDescription(e.target.value)
                }} />
                <select>
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2</option>
                </select>
                <button>Add Vehicle</button>
                
            </form>
        </div>
    )
}