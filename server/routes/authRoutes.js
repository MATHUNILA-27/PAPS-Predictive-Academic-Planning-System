const router=require("express").Router();
const User=require("../models/User");
const Student=require("../models/StudentData");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const SECRET="SECRET123";

router.post("/register",async(req,res)=>{
try{
const {fullName,role,email,password}=req.body;

if(!fullName||!role||!email||!password)
return res.status(400).json({msg:"Missing fields"});

const exists=await User.findOne({email});
if(exists) return res.status(400).json({msg:"Email exists"});

const hash=await bcrypt.hash(password,10);

const newUser=await User.create({
fullName,
role:role.toLowerCase(),
email,
password:hash
});

if(role.toLowerCase()==="student"){
await Student.create({
userId:newUser._id,
courses:[],
goals:[]
});
}

const token=jwt.sign({id:newUser._id},SECRET,{expiresIn:"7d"});

res.json({token,user:newUser});

}catch(e){res.status(500).json({msg:"Register failed"});}
});

router.post("/login",async(req,res)=>{
try{
const {email,password,role}=req.body;

const user=await User.findOne({email});
if(!user) return res.status(400).json({msg:"User not found"});

if(user.role!==role)
return res.status(400).json({msg:"Wrong role selected"});

const ok=await bcrypt.compare(password,user.password);
if(!ok) return res.status(400).json({msg:"Wrong password"});

const token=jwt.sign({id:user._id},"SECRET123",{expiresIn:"7d"});

res.json({token,user});

}catch(e){res.status(500).json({msg:"Login failed"});}
});

module.exports=router;