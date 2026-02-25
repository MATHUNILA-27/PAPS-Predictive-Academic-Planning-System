import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUserGraduate, FaUserTie, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import "./login.css";

export default function Login(){

const navigate=useNavigate();

const [role,setRole]=useState("student");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleLogin=async(e)=>{
e.preventDefault();

try{

const res=await api.post(
"/auth/login",
{email,password,role}
);

localStorage.setItem("token",res.data.token);
localStorage.setItem("userId",res.data.user._id);
localStorage.setItem("role",res.data.user.role);
localStorage.setItem("name",res.data.user.fullName);

navigate(`/${res.data.user.role}-dashboard`);

}catch(err){
alert(err.response?.data?.msg || "Login failed");
}
};

return (
<Container fluid className="vh-100 d-flex align-items-center gradient-bg">
<Row className="w-100">

<Col md={6} className="text-white px-5">
<h2 className="fw-bold">PAPS</h2>
<h1 className="mt-4 fw-bold">
Empowering Education Through Data-Driven Insights
</h1>
<p>
Monitor student performance, predict academic outcomes,
and provide personalized guidance for academic success.
</p>
</Col>

<Col md={6} className="d-flex justify-content-center">
<Card className="login-card p-4">

<h5 className="text-center mb-3">Sign in to your account</h5>

<div className="d-flex gap-2 mb-3">

<Button
type="button"
variant={role==="student"?"primary":"outline-secondary"}
onClick={()=>setRole("student")}
>
<FaUserGraduate/> Student
</Button>

<Button
type="button"
variant={role==="faculty"?"primary":"outline-secondary"}
onClick={()=>setRole("faculty")}
>
<FaUserTie/> Faculty
</Button>

<Button
type="button"
variant={role==="admin"?"primary":"outline-secondary"}
onClick={()=>setRole("admin")}
>
<FaUserShield/> Admin
</Button>

</div>

<Form onSubmit={handleLogin}>

<Form.Group className="mb-3">
<Form.Control
placeholder="Enter your email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Control
type="password"
placeholder="Enter your password"
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</Form.Group>

<Button type="submit" className="w-100 gradient-btn">
Sign In
</Button>

</Form>

<p className="text-center mt-3 mb-0">
New user?{" "}
<span
style={{color:"#0d6efd", cursor:"pointer", fontWeight:"500"}}
onClick={()=>navigate("/register")}
>
Create Account
</span>
</p>

</Card>
</Col>

</Row>
</Container>
);
}