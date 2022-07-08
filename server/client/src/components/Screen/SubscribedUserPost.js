import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { userContext } from '../../App'

export const SubscribedUserPost = () => {
    const {state,dispatch}=useContext(userContext)
const [post, setpost] = useState([])
// ---------------------DISPLAY POST FUNCTION-----------------------
    const displayAllPost=async()=>{
    const res=await fetch('/getsubpost',{
        method:'GET',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        })
        const data=await res.json();
        
        console.log(data)   
        setpost(data.posts)
        

    }
        useEffect(() => {
          displayAllPost()
        }, [])

  // -------------------LIKE POST FUNCTION----------------------
  const likePost=async(id)=>{
            const res=await fetch('/like',{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            postId:id
        })
        })  
                const data=await res.json()
                const newData=post.map(item=>{
                   if(item._id==data._id){

                       return data
                   }
                   else{

                       return item
                   }
                })
                setpost(newData)
                console.log(data)
        }
  // -------------------UNLIKE POST FUNCTION----------------------
        const unlikePost=async(id)=>{
            const res=await fetch('/unlike',{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            postId:id
        })
        })  
                const data=await res.json()
                const newData=post.map(item=>{
                   if(item._id==data._id){

                       return data
                   }
                   else{

                       return item
                   }
                })
                setpost(newData)
                console.log(data)
        }
        // -----------COMMENT FUNCTION------------------------------------
        const makeComment=async(text,id)=>{
            const res=await fetch('/comment',{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            text:text,
            postId:id
        })
        })  
                const data=await res.json()
                const newData=post.map(item=>{
                   if(item._id==data._id){

                       return data
                   }
                   else{

                       return item
                   }
                })
                setpost(newData)
                console.log(data)
        }
    return (
        <div className="home">
        
        { post.length!=0 ? 
        post.map(item=>{
            return(
                <div className="card home-card" key={item._id}>
                <h5><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link></h5>
              
                    <div className="card-image">
                    <img src={item.photo} alt="nahi h " />

                    </div>

                
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                {item.likes.includes(state._id)?(
                    <i className="material-icons b"  onClick={()=>{
                    unlikePost(item._id)
                }}>thumb_down</i>
                ):(
                    <i className="material-icons b" onClick={()=>{
                    likePost(item._id)
                }}>thumb_up</i>
                )}
               
                
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {
                    item.comments.map(commment=>{
                        return(
                            <h6 key={commment._id}><span style={{fontWeight:'500'}}>{commment.postedBy.name + "-"}</span> {commment.text}</h6>
                        )
                    })
                }
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value,item._id)
                    e.target[0].value=""
                }}>
                <input type="text" placeholder="Add a Comment" />

                </form>
                </div>
                </div>
            )
        })
        :
        (<>
            <h3 style={{textAlign:"center"}}>You are not following any user.</h3>
            <h4 style={{textAlign:"center"}}><p>Plz follow users to see  their posts....</p></h4>
            </>
        )
           }
        
     

       
 
       
     </div>
        
    )


}