const sampleArr = [
    {
        key: "V001",
        name: "Toyota Corolla",
        price: 5000,
        description: "A reliable and fuel-efficient sedan.",
        category: "Sedan",
        image: ["https://example.com/toyota-corolla.jpg"],
        isAvailable: true
    },
    {
        key: "V002",
        name: "Honda Civic",
        price: 5500,
        description: "A stylish and high-performance sedan.",
        category: "Sedan",
        image: ["https://example.com/honda-civic.jpg"],
        isAvailable: true
    },
    {
        key: "V003",
        name: "Ford Explorer",
        price: 8000,
        description: "A spacious and powerful SUV for all terrains.",
        category: "SUV",
        image: ["https://example.com/ford-explorer.jpg"],
        isAvailable: true
    },
    {
        key: "V004",
        name: "Tesla Model S",
        price: 12000,
        description: "A luxury electric sedan with advanced features.",
        category: "Electric",
        image: ["https://example.com/tesla-model-s.jpg"],
        isAvailable: true
    },
    {
        key: "V005",
        name: "Volkswagen Golf",
        price: 4500,
        description: "A compact and efficient hatchback.",
        category: "Hatchback",
        image: ["https://example.com/vw-golf.jpg"],
        isAvailable: true
    }
];

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AdminVehiclesPage(){

    const [products, setProducts] = useState(sampleArr)

    return(
        <div className='w-full h-full bg-blue-50 relative'>
            <table>
                <thead>
                    <th>Product Key</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Availability</th>
                    <th>Actions</th>
                </thead>

                <tbody>
                    {
                        products.map((product)=>{
                            console.log(product)
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.isAvailable ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to='/admin/vehicles/add'>
                <IoIosAddCircle className='text-[60px] text-blue-600 flex absolute right-[25px] bottom-[25px] hover:text-green-400 cursor-pointer transition-transform active:scale-120' />
            </Link>
            
        </div>
    )
}