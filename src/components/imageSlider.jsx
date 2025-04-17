import { useState } from "react";

export default function ImageSlider(props){
    
    const images = props.images;

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return(
        <div className="w-full flex flex-col items-center">
            <img src={selectedImage} alt="image_loading" className="object-contain mb-[10px] w-full h-[200px] md:h-[300px]" />

            <div className="w-full h-[80px] flex justify-center bg-white ">
                {
                    images.map((image, index)=>{
                        return(
                            <img key={index} src={image} 
                                alt="image_loading" 
                                className={`w-[50px] md:w-[70px] h-[50px] md:h-[70px] m-1 object-contain rounded-lg border-1 border-blue-600 hover:scale-105 transition-transform duration-300 cursor-pointer ${image === selectedImage && "border-2 border-blue-700"}`}
                                onClick={() => setSelectedImage(image) }
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}