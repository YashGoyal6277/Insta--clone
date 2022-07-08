const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=require('../models/post')
const requiredLogin=require('../middleware/requiredLogin')
const User=require('../models/user')
// -----------getting user profile------

router.get('/user/:id',requiredLogin,async(req,res)=>{
    try{
    const user=await User.findOne({_id:req.params.id}).select("-password")
    if(user){
    const posts=await Post.findOne({postedBy:req.params.id}).populate("postedBy","_id name")
   
     res.json({user,posts})
    }
}
catch(err){
   return res.status(404).json({errpr:"user not found"})
}
})

// --------follow user-----------

// router.put('/follow',requiredLogin,async(req,res)=>{
//     try{
      
//         const result= await User.findByIdAndUpdate(req.body.followId,{
//             $push:{followers:req.user._id}
//         },
//         {   
//             new:true
//         })
//         console.log(result)
//         if(result){
          
//             try{
//                 const finalresult= User.findByIdAndUpdate(req.user._id,{
//                     $push:{following:req.body.followId}
                    
//                 },{
//                     new:true
//                 }).select('-password')
                
//                return res.json(finalresult)   
//             }
//             catch(err){
//                 res.status(422).json({error:err})
//             }
         
//         }
// }
// catch(err){
//    res.status(422).json({error:err})
// }
// })


router.put('/follow',requiredLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})


// ----------unfollow user----------------
router.put('/unfollow',requiredLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})



module.exports=router;