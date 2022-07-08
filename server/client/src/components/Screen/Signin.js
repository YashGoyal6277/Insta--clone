import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { userContext } from '../../App'
import { useContext } from 'react'
import M from 'materialize-css'
import './signin.css'

export  const Signin = () => {
  const {state,dispatch} = useContext(userContext)
 
  const history=useHistory()
  const [user, setUser] = useState({
    email:"",
    password:""
  })
 
  const PostData=async(e)=>{
  try{
      console.log('post data')
    e.preventDefault();
    const {email,password}=user;
    if( !email || !password){
      return M.toast({html:"Plz Fill all the field..",classes:"#c62828 red darken"}) 
    }
    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return M.toast({html:"Enter a valid Email...",classes:"#c62828 red darken"})
    }
    const res=await fetch("/signin",{
      method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(
          {email,password})
    });


     const data=await res.json()
     console.log(data)
     if(data.error){
      M.toast({html: data.error,classes:"#c62828 red darken"})
      setUser({
        email:"",
        password:""
      })
      

    }
    else{
      
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      dispatch({
        type:'USER',
        payload:data.user
      })
      
      M.toast({html:"Successfully Login",classes:"#43a047 green darken"})
      history.push('/')
 
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
    return (
        <div className="mycard">
        
                 
            <div class="card auth-card input-field">
            <h2>Instagram</h2>
            <div class="row">
    <form class="col s12">
     
        <div class="input-field col s10">
          <i class="material-icons prefix">email</i>
          <input id="icon_prefix" type="email" name="email" class="validate" onChange={inputHandler} value={user.email}/>
          <label for="icon_prefix">Email</label>
        </div>
        
        <div class="input-field col s10">
          <i class="material-icons prefix">lock</i>
          <input id="icon_telephone" type="password" name="password"class="validate" onChange={inputHandler} value={user.password}/>
          <label for="icon_telephone">Password</label>
        </div>
    
    </form>
  </div>
<button className="btn waves-effect  #64b5f6 blue darken-2" onClick={PostData}>
Login </button>
<h5>
    <Link to='/signup'>Don't have an account?</Link>
</h5>
        </div>
        </div>
       
    )
}

