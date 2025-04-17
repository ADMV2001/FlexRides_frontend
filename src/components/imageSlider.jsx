import { useState } from "react";

export default function ImageSlider(props){
    
    const images = props.images;

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return(
        <div className="w-full h-full flex flex-col items-center">
            <img src={selectedImage} alt="image_loading" className="w-full h-[500px] ml-[20px] z-1 p-3 rounded-[30px] object-contain mt-[20px] border-1 border-gray-300" />

            <div className="w-full h-[150px] flex justify-center bg-white">
                {
                    images.map((image, index)=>{
                        return(
                            <img key={index} src={image} 
                                alt="image_loading" 
                                className={`w-[100px] h-[100px] m-1 object-cover rounded-lg border-1 border-blue-600 hover:scale-105 transition-transform duration-300 cursor-pointer ${image === selectedImage && "border-3 border-blue-700"}`}
                                onClick={() => setSelectedImage(image) }
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}