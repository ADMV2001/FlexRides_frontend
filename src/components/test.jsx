import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function Test(){

    const [file, setFile] = useState(null);
    
    function uploadFile(){
        mediaUpload(file).then((url)=>{
            console.log(url)
        })
    }

    return(
        <>
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} className="border" />
            <button onClick={uploadFile} className="">Upload</button>
        </>
            
        
    );
}