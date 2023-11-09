const express=require('express')
const app=express()
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/projectdata")
const collection1Schema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    otp:String    
});
const collection2Schema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    otp:String    
});
const collection1=mongoose.model("dataofUsers",collection1Schema)
const collection2=mongoose.model("dataofadmins",collection2Schema)
app.use(express.json())
app.post("/adminlogin",async(req,res)=>{
    const {username,password,usernameofuser}=req.body
    const user=await collection2.findOne({username:username})
    if(user!=null){
        if(await bcrypt.compare(password,user.password))
    {   
        
        const user1=await collection1.findOne({username:usernameofuser})
        res.send(user1)
    }
    else{
        res.send("invalid password")
    }
}
    else{
        res.send("invalid username")
    }   
})
app.listen(4000,()=>{
    console.log("server is connected")
})