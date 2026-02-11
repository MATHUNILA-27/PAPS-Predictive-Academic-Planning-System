import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUserGraduate, FaUserTie, FaUserShield, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Register() {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("Student");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.fullName,   
          role: selectedRole,
          email: formData.email,
          password: formData.password,
        }
      );

      alert("Account Created Successfully");

      // ✅ After register → go to login
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Register Failed");
      console.log(err.response);
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

            <h5 className="text-center mb-3">
              Create Your Account
            </h5>

            <Form onSubmit={handleRegister}>

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter your full name"
                  onChange={(e)=>
                    setFormData({...formData,fullName:e.target.value})
                  }
                />
              </Form.Group>

              <Form.Label>Select Your Role</Form.Label>
              <div className="d-flex gap-2 mb-3">

                <Button
                  type="button"
                  variant={selectedRole==="Student"?"primary":"outline-secondary"}
                  onClick={()=>setSelectedRole("Student")}
                >
                  <FaUserGraduate/> Student
                </Button>

                <Button
                  type="button"
                  variant={selectedRole==="Faculty"?"primary":"outline-secondary"}
                  onClick={()=>setSelectedRole("Faculty")}
                >
                  <FaUserTie/> Faculty
                </Button>

                <Button
                  type="button"
                  variant={selectedRole==="Admin"?"primary":"outline-secondary"}
                  onClick={()=>setSelectedRole("Admin")}
                >
                  <FaUserShield/> Admin
                </Button>

              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e)=>
                    setFormData({...formData,email:e.target.value})
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e)=>
                    setFormData({...formData,password:e.target.value})
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(e)=>
                    setFormData({...formData,confirmPassword:e.target.value})
                  }
                />
              </Form.Group>

              <Button type="submit" className="w-100 gradient-btn">
                <FaUserPlus/> Create Account
              </Button>

            </Form>

          </Card>
        </Col>

      </Row>
    </Container>
  );
}
