const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentportal");

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/student",require("./routes/studentRoutes"));
app.use("/api/faculty",require("./routes/facultyRoutes"));

app.listen(5000,()=>console.log("Server running"));