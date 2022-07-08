import React, { useEffect, useState } from 'react'
import './profile.css'
import { userContext } from '../../App'
import { useContext } from 'react'
import { useParams } from 'react-router'

export const Userprofile = () => {
  const { state, dispatch } = useContext(userContext)
  const [userProfile, setUserProfile] = useState(null)
  const { userid } = useParams()

  // ------------follow user------------
  const followUser = async () => {
    const res = await fetch('/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    })
    const data = await res.json()
    dispatch({
      type:'UPDATE',
      payload:{
        following:data.following,
        followers:data.followers
      }
    })  
    localStorage.setItem("user",JSON.stringify(data))
   setUserProfile((prevstate)=>{
     return{
       ...prevstate,
       user:{
         ...prevstate.user,
         followers:[...prevstate.user.followers,data._id]
       }
     }
   }) 
    //  displayUserProfile()
   
  }
  // ---------------UNFOLLOW USER------------
  const unfollowUser = async () => {
    const res = await fetch('/unfollow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    })
    const data = await res.json()
    {console.log(data)}
    dispatch({
      type:'UPDATE',
      payload:{
        following:data.following,
        followers:data.followers
      }
    })  
    displayUserProfile()
  //   setUserProfile((prevState)=>{
  //     const newFollower = prevState.user.followers.filter(item=>item != data._id )
  //      return {
  //          ...prevState,
  //          user:{
  //              ...prevState.user,
  //              followers:newFollower
  //             }
  //      }
  //  })  
   localStorage.setItem("user",JSON.stringify(data))
   
  }
  // -----display user profile------------
  const displayUserProfile = async () => {
    const res = await fetch(`/user/${userid}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    })
    const data = await res.json();
    console.log(data)
    setUserProfile(data)

  }


  useEffect(() => {
    displayUserProfile()
  }, [])

  return (
    <>     
 
      {userProfile ?
        <div className="profile">


          <div className="profile-cont">
            <div className="profile_img_sec">
              <img src={userProfile.user.pic} alt="" style={{ width: "160px", height: "160px", borderRadius: "80px" }} />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div className="profile_content_sec">
                <div className="profile_content">
                  <h5> {[userProfile.posts].length} posts</h5>
                  <h5>{userProfile.user.followers.length} followers</h5>
                  <h5>{userProfile.user.following.length} following</h5>
                </div>
            
                {userProfile.user.followers.includes(state._id)?<button  style={{
                    margin:"10px"
                  }} className="btn waves-effect  #64b5f6 blue darken-2" onClick={() => unfollowUser()}>
                  UnFollow</button>
                  :
                  <button style={{
                    margin:"10px"
                  }}className="btn waves-effect  #64b5f6 blue darken-2" onClick={() => followUser()}>
                  Follow</button>}
              </div>
            </div>

          </div>
          <div className="gallery">
            {[userProfile.posts].map(item => {
              return (
                <img className="item" src={item?item.photo:""} alt="no pic" key={item._id} />
              )
            })}


          </div>
        </div>

        :
        <h2>Loading........!</h2>}

    </>
  )
}
