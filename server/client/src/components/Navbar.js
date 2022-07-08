import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../App'
import { useHistory } from 'react-router'
export const Navbar = () => {
  const history=useHistory()
  const {state,dispatch} = useContext(userContext)
  const render=()=>{
  if(state){

        return(
          <>
          {console.log('navbar')}
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/myfollowerspost">My Following Post</Link></li> 
        <li><Link to="/create">Create Post</Link></li>
        <li>
        <button className="btn waves-effect #64b5f6 red darken-2" onClick={()=>{
          localStorage.removeItem('user')
          dispatch({
            type:'CLEAR'
          })
          history.push('/signin')
        }}>
Logout</button>
        </li>
        </>
        ) 
      }
      else{
        return(
          <>
               <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
          </>
        )
      }  
}
    return (
        <>
          <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo">Instagram</Link>
      <ul id="nav-mobile" className="right">
      {render()}
        
      </ul>
    </div>
  </nav>
  
          
        </>
    )
}
