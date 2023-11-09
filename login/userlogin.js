const express=require('express')
const app=express()
const bcrypt=require("bcrypt")
const connect=require("../database/connect")
const model=require("../database/model")
app.use(express.json())
app.post("/userlogin",async(req,res)=>{
    const {username,password}=req.body
    const user=await model.collection1.findOne({username:username})
    console.log(user)
    if(user!=null){
        if(await bcrypt.compare(password,user.password))
    {
        res.send("login sucessful")
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