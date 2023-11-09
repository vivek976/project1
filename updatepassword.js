const express=require("express")
const app=express()
const bcrypt=require("bcrypt")
const connect=require("./database/connect")
const model=require("./database/model")
app.use(express.json())
app.post("/updatepassword",async(req,res)=>{
    const {email,otp,password}=req.body
    const user=await model.collection2.findOne({email:email})
    if(!user)
    {
        res.send("invalid user")
        return
    }
    if(otp==user.otp)
    {
        const pass=await bcrypt.hash(password,10)
        user.password=pass
        await user.save()
        res.send("password updated")
    } 

})
app.listen(4000,()=>{
    console.log("server is connected")
})