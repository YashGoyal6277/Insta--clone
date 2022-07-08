const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=require('../models/post')
const User=require('../models/user')
const requiredLogin=require('../middleware/requiredLogin')
// -------ALL POST ROUTER---------------
router.get('/allpost',requiredLogin,async(req,res)=>{
    try{
        const posts=await Post.find().populate('postedBy',"_id name pic").populate("comments.postedBy","_id name pic")
             res.json({posts:posts}) 
    }
    catch(err){
        console.log(err)
    }
})
// ------------SUBSCRIBED POST---------------
router.get('/getsubpost',requiredLogin,async(req,res)=>{
    try{
        const posts=await Post.find({postedBy:{$in:req.user.following}}).populate('postedBy',"_id name pic").populate("comments.postedBy","_id name pic")
             res.json({posts:posts}) 
    }
    catch(err){
        console.log(err)
    }
})

// -------CREATE POST ROUTER---------------
router.post('/createpost',requiredLogin,async(req,res)=>{
    try{
        const {title,body,pic}=req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Plz fill all fields"})
    }
    req.user.password=undefined;
    const post=new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    const result=await post.save()
    if(result){
        res.json({post:result})
    }
    

    }
   catch(err){
       console.log(err)
   }    
})

// -------MY POST ROUTER---------------
router.get('/mypost',requiredLogin,async(req,res)=>{
    try{
  
        const mypost=await Post.find({postedBy:req.user._id}).populate('postedBy','_id name pic')
            res.json({mypost})
    }
    catch(err){
        console.log(err)
    }
})

// -------UNLIKE POST ROUTER---------------
router.put('/unlike',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic").populate("postedBy","_id name pic").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// -------LIKE POST ROUTER---------------
router.put('/like',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic").populate("postedBy","_id name pic").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// -------COMMENT ON POST ROUTER---------------
router.put('/comment',requiredLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic").populate("postedBy","_id name pic").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// -----------getting user profile------
// router.get('/user/:id',requiredLogin,async(req,res)=>{

// try{
//     const user=await User.findOne({_id:req.params.id}).select("-password")
//     if(user){
//     const posts=await Post.find({postedBy:req.params.id}).populate("postedBy","_id name")   
//      res.json({user,posts})
//     }
// }
// catch(err){
//     res.json("user not found")
// }
//  })
// router.get('/user/:id',requiredLogin,(req,res)=>{
//     User.findOne({_id:req.params.id})
//     .select("-password")
//     .then(user=>{
//         Post.find({postedBy:req.params.id})
//         .populate("postedBy","_id name")
//         .exec((err,posts)=>{
//             if(err){
//                 res.json("error Occured")
//             }
//             res.json({user,posts})
//         })

//     }).catch(err=>{
//         res.json("user not found")
//     })
// })
// -------------------------------------------



module.exports=router