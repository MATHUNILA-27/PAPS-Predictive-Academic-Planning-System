const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  department:String,
  designation:String,

  advisees:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"StudentData"
    }
  ]

},{timestamps:true});

module.exports = mongoose.model("Faculty", facultySchema);