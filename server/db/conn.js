const mongoose=require('mongoose')
const {MONGOURI}=require('../config/keys')
mongoose.connect(MONGOURI)
mongoose.connection.on('connected',async()=>{
    try{
        
        console.log("connection successful")    
    }
    catch(err){
        console.log(err)
    }
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})