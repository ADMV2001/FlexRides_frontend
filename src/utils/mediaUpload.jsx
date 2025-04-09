import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsamdmdWhqZnJhZ2dwa2dmbXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjUwNzksImV4cCI6MjA1OTc0MTA3OX0.GtgBVlJChTiatwKgi4DJCHniTQGNmOHBEp067WpxTBY"
const supabase_url = "https://dljgfuhjfraggpkgfmtx.supabase.co"

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file){

    return new Promise((resolve, reject)=>{
        if(!file){
            return reject("File not selected")
        }

        const timeStamp = new Date().getTime()
        const fileName = timeStamp + file.name

        supabase.storage.from("media-uploads").upload(fileName, file,{
            cacheControl : '3600',
            upsert : false
        }).then(()=>{
            const public_url = supabase.storage.from("media-uploads").getPublicUrl(fileName).data.publicUrl;
            console.log(public_url);
            resolve(public_url);

        }).catch(()=>{
            reject("Error uploading file");
        })

    })   
}

//we have to use @supabase/supabase-js --> npm install @supabase/supabase-js
//"media-uploads" is the bucket name
//your upload file must have a unique name, therefore you have to add timestamp before the file name and use filename as that
