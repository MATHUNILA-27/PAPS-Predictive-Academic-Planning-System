const router=require("express").Router();
const mongoose=require("mongoose");
const Student=require("../models/StudentData");

const toId=id=>new mongoose.Types.ObjectId(id);

/* GET STUDENT */
router.get("/:userId",async(req,res)=>{
const student=await Student.findOne({userId:toId(req.params.userId)});
res.json(student);
});

/* UPDATE PROFILE */
router.put("/profile/:userId",async(req,res)=>{
const student=await Student.findOneAndUpdate(
{userId:toId(req.params.userId)},
req.body,
{new:true}
);
res.json(student);
});

/* UPDATE COURSES */
router.put("/courses/:userId",async(req,res)=>{
const student=await Student.findOneAndUpdate(
{userId:toId(req.params.userId)},
{courses:req.body},
{new:true}
);
res.json(student);
});

/* UPDATE GOALS */
router.put("/goals/:userId",async(req,res)=>{
const student=await Student.findOneAndUpdate(
{userId:toId(req.params.userId)},
{goals:req.body},
{new:true}
);
res.json(student);
});

/* ADD GOAL */
router.post("/goal/:userId",async(req,res)=>{
const student=await Student.findOne({userId:toId(req.params.userId)});
student.goals.push(req.body);
await student.save();
res.json(student);
});

module.exports=router;