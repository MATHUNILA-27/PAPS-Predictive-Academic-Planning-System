const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title:String,
  desc:String,
  progress:{type:Number,default:0},
  current:{type:Number,default:0},
  target:{type:Number,default:100},
  due:String
});

const courseSchema = new mongoose.Schema({
  name:String,
  code:String,
  credits:Number,
  marks:{type:Number,default:0},
  attendance:{type:Number,default:0}
});

const studentSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },
  cgpa:{type:Number,default:0},
  attendance:{type:Number,default:0},
  semester:{type:Number,default:1},
  courses:[courseSchema],
  goals:[goalSchema]
},{timestamps:true});

module.exports = mongoose.model("StudentData",studentSchema);