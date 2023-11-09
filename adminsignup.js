const express=require('express')
const app=express()
const bcrypt=require("bcrypt")
const connect=require("./database/connect")
const model=require("./database/model")


app.use(express.json())
console.log("here working")
app.post("/",async(req,res)=>{
    console.log("here also working")
    const {username,password,email}=req.body
    const existingUser = await model.collection2.findOne({username:username })
    if(existingUser){
        res.send("username is already used")
        return
    }
    const hash=await bcrypt.hash(password,10)
    
    await model.collection2.create({
      username:username,
      password:hash,
      email:email
    })
    
    res.send("signed up sucess")
})
app.listen(4000,()=>{
    console.log("server is connected")
})
