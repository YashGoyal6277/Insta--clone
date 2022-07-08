import React, { useEffect, useState } from 'react'
import './profile.css'
import { userContext } from '../../App'
import { useContext } from 'react'


export const Profile = () => {
  const { state, dispatch } = useContext(userContext)

  const [post, setpost] = useState([])
  const [image, setimage] = useState("")
  const [url, seturl] = useState("")
  const displayMyPost = async () => {
    const res = await fetch('/mypost', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    })
    const data = await res.json();
    console.log(data.mypost)
    setpost(data.mypost)


  }
  useEffect(() => {
    displayMyPost()
  }, [])



  return (
    <>

      <div className="profile">


        <div className="profile-cont">
          <div className="profile_img_sec">

            <img src={state?state.pic :"loading"} alt="" style={{ width: "160px", height: "160px", borderRadius: "80px" }} />


          </div>
          <div className="profile_content_sec">
            <h5>{state ? state.name : "loading"}</h5>
            <h5>{state ? state.email : "loading"}</h5>
            <div className="profile_content">
              <h5>{post.length} posts</h5>
                <h5>{state?state.followers.length :"0"} followers</h5>
              <h5> {state?state.following.length :"0"} following</h5>
            </div>
          
          </div>
        </div>
        <div className="gallery">
          {post.map(item => {
            return (
              <img className="item" src={item.photo} alt="no pic" key={item._id} />
            )
          })}


        </div>
      </div>
    </>
  )
}
