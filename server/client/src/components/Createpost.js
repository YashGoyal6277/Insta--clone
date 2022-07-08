import React, { useEffect, useState } from 'react'
import './createpost.css'
import M from 'materialize-css'
import { useHistory } from 'react-router'
export const Createpost = () => {
  const history=useHistory()
  const [title, settitle] = useState("")
  const [body, setbody] = useState("")
  const [image, setimage] = useState("")
  const [url, seturl] = useState("")
  const onLoading=async() => {
    if(url){
      const res=await fetch("/createpost",{
        method:'POST',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify(
            {
              title,
              body,
              pic:url
            })
      });
      const data=await res.json()
       console.log(data)
       if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken"})
        
  
      }
      else{
        M.toast({html:"Successfully uploaded",classes:"#43a047 green darken"})
        history.push('/')
      }
    
      console.log(data)
      
    
    }
   }
   useEffect(() => {
  onLoading()
  }, [url])
  const postDetails=async()=>{
    try{
  if(!title || !body || !image){
    return   M.toast({html:"Plz fill all fields",classes:"#c62828 red darken"})
  }
      const data=new FormData()
      data.append('file',image)
      data.append('upload_preset','insta-clone')
      data.append("cloud_name", "dhmb61mq4")
      const res=await fetch('https://api.cloudinary.com/v1_1/dhmb61mq4/image/upload',{
        method:'post',
        body:data
      })
      const result=await res.json();
      seturl(result.url)
      console.log(result)

    }
    catch(err){
      console.log(err)
    }
    
  }
    return (
        <div className="card input-filed create_post_cont">
        <input type="text" name="" id="" value={title} placeholder="Title" onChange={(e)=>{
            settitle(e.target.value)
        }} />
        <input type="text"  placeholder="Body" value={body}  onChange={(e)=>{
            setbody(e.target.value)
        }} />
        <div className="file-field input-field">
      <div className="btn">
      <i class="material-icons right">camera_alt</i>
        <span>Upload Image</span>
        <input type="file"  onChange={(e)=>{
          console.log(e.target.files)
          setimage(e.target.files[0])
        }}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>

            </div>
      <button className="btn waves-effect #64b5f6 blue darken-2" onClick={postDetails}>
Add Post </button>
        </div>
    )
}
