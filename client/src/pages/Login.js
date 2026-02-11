import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUserGraduate, FaUserTie, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTANT
import axios from "axios";
import "./login.css";

export default function Login() {

  const navigate = useNavigate(); // ✅ navigation enabled

  const [selectedRole, setSelectedRole] = useState("Student");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);

    navigate("/student-dashboard");

  } catch (err) {
    alert(err.response?.data?.msg || "Login Failed");
  }
};

  return (
    <Container fluid className="vh-100 d-flex align-items-center gradient-bg">
      <Row className="w-100">

        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <Col md={6} className="d-flex justify-content-center">
          <Card className="login-card p-4">

            <h5 className="text-center mb-3">Sign in to your account</h5>

            <div className="d-flex gap-2 mb-3">

              <Button
                variant={selectedRole === "Student" ? "primary" : "outline-secondary"}
                onClick={() => setSelectedRole("Student")}
              >
                <FaUserGraduate /> Student
              </Button>

              <Button
                variant={selectedRole === "Faculty" ? "primary" : "outline-secondary"}
                onClick={() => setSelectedRole("Faculty")}
              >
                <FaUserTie /> Faculty
              </Button>

              <Button
                variant={selectedRole === "Admin" ? "primary" : "outline-secondary"}
                onClick={() => setSelectedRole("Admin")}
              >
                <FaUserShield /> Admin
              </Button>

            </div>

            <Form onSubmit={handleLogin}>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Enter your email"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>

              <Button type="submit" className="w-100 gradient-btn">
                Sign In
              </Button>

            </Form>

            <Button className="w-100 mt-3" variant="light">
              Sign in with Google
            </Button>

            {/* ✅ NAVIGATE TO REGISTER PAGE */}
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

          </Card>
        </Col>

      </Row>
    </Container>
  );
}
