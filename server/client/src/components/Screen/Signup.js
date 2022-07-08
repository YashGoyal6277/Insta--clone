import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import M from 'materialize-css'
export const Signup = () => {
  
  const history=useHistory()
 
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  })
  const [image, setimage] = useState("")
  const [url, seturl] = useState(undefined)
  useEffect(() => {
if(url)
   uploadFields()
 }, [url])
  
  const PostData=()=>{
    console.log("post data")
    const {name,email,password}=user;
      if(!name || !email || !password){
        return M.toast({html:"Plz Fill all the field..",classes:"#c62828 red darken"}) 
      }
      console.log('aaa')
      if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return M.toast({html:"Enter a valid Email...",classes:"#c62828 red darken"})
      }
  
   
      if(image){
          uploadPic()
        }
        else{
          uploadFields()
        }
      }

  const uploadFields=async()=>{
    try{
      
      const {name,email,password}=user;
     console.log('upload field')
      const res=await fetch("/signup",{
        method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(
            {name,email,password,pic:url})
      });
  
  
       const data=await res.json()
       if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken"})
        setUser({
          name:"",
          email:"",
          password:""
        })
  
      }
      else{
        M.toast({html: data.msg,classes:"#43a047 green darken"})
        history.push('/signin')
      }
    
      console.log(data)
      
    }
    catch(err){
      console.log(err)
      
    }
       
  }
  const inputHandler=(e)=>{
      const value=e.target.value;
      const name=e.target.name;
      setUser({...user,[name]:value})
  }
  const uploadPic=async()=>{
    try{
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
      console.log('url set')
      console.log(result)

    }
    catch(err){
      console.log(err)
    }
    
  }
 
    return (
        <>
        <div className="mycard">
        
                 
        <div class="card auth-card input-field">
        <h2>Instagram</h2>
        <div class="row">
<form class="col s12">
 
    <div class="input-field col s10">
      <i class="material-icons prefix">person</i>
      <input id="icon_prefix" type="text" class="validate" name="name" onChange={inputHandler} value={user.name} />
      <label for="icon_prefix">Name</label>
    </div>
   
    
    <div class="input-field col s10">
      <i class="material-icons prefix">email</i>
      <input id="icon_email" type="email" name="email"class="validate" onChange={inputHandler} value={user.email} />
      <label for="icon_email">Email</label>
    </div>
 
    <div class="input-field col s10">
      <i class="material-icons prefix">lock</i>
      <input id="icon_password" type="password" name="password"class="validate" onChange={inputHandler} value={user.password} />
      <label for="icon_password">Password</label>
    </div>
    <div class="file-field input-field col l10">
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

   
 
</form>
    
</div>
<button  className="btn waves-effect waves-dark #64b5f6 blue darken-2" onClick={()=>PostData()}>
SignUp</button>
<h5>
<Link to='/signin' >Already have an account?</Link>
</h5>
    </div>
    </div>
        </>
        
    )
}
