import React, { useContext, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import { Switch, useHistory } from "react-router";
import { Home } from "./components/Screen/Home";
import { Signup } from "./components/Screen/Signup";
import { Profile } from "./components/Screen/Profile";
import {Signin} from "./components/Screen/Signin";
import { Createpost } from "./components/Createpost";
import { reducer,initialState } from "./reducer/userReducer";
import { SubscribedUserPost } from "./components/Screen/SubscribedUserPost";
import { Userprofile } from "./components/Screen/Userprofile";
import { useReducer } from "react";
import { createContext } from "react";

export const userContext=createContext()


const Routing=()=>{
  {console.log('routing')}
  const history=useHistory();
  const {state,dispatch}=useContext(userContext)

  useEffect(() => {
 
    const user=JSON.parse(localStorage.getItem('user'))
    if(user)
    {
       dispatch({
        type:'USER',
        payload:user
      })
    }
    else{
      history.push('/signin')
    }
  }, [])
  return(
    <Switch>
      <Route exact path='/'>
    <Home />
   
      </Route>
      <Route exact path='/signin'>
    <Signin />
      </Route>
      <Route exact path='/profile'>
    <Profile />
      </Route>
      <Route exact path='/signup'>
    <Signup />
      </Route>
      <Route exact path='/create'>
    <Createpost />
      </Route>
      <Route exact path='/profile/:userid'>
    <Userprofile />
      </Route>
      <Route exact path='/myfollowerspost'>
    <SubscribedUserPost />
      </Route>
      </Switch>
      )
}
function App() {
 
  const [state, dispatch] = useReducer(reducer, initialState)
  {console.log(state)}
  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <Router>
     <Navbar />
    
      <Routing />
    </Router>
    </userContext.Provider>
    </>
  );
}

export default App;
