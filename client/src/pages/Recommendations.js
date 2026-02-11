import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Image,
  Button,
} from "react-bootstrap";
import { FaBell, FaStar, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Recommendations() {
  return (
    <div className="dashboard-bg">

      {/* ===== TOP NAVBAR ===== */}
      <Navbar className="topbar px-4">
        <div className="d-flex align-items-center">
          <div className="logo-box me-3">🎓</div>
          <div>
            <h5 className="text-white m-0">Student Portal</h5>
            <small className="text-light">
              Academic Planning & Progress
            </small>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center text-white">
          <FaBell className="me-4" />
          <Image src="https://i.pravatar.cc/40" roundedCircle />
          <div className="ms-2">
            <div>NILA</div>
            <small>CS2021001</small>
          </div>
        </div>
      </Navbar>

      {/* ===== MENU BAR ===== */}
      <div className="menu-bar px-4">
        <Nav>
          <Nav.Link as={Link} to="/student-dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/my-courses">My Courses</Nav.Link>
          <Nav.Link as={Link} to="/performance">Performance</Nav.Link>

          <Nav.Link as={Link} to="/recommendations" className="active-tab">
            <FaStar className="me-1" /> Recommendations
          </Nav.Link>

          <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
        </Nav>
      </div>

      {/* ===== CONTENT ===== */}
      <Container fluid className="p-4">
        <h3 className="fw-bold mb-4">
          Course Recommendations for Next Semester
        </h3>

        <Row className="g-4">

          {/* ===== AI CARD ===== */}
          <Col md={6}>
            <Card className="recommend-card p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="icon-box-green">
                  <FaBookOpen />
                </div>
                <span className="recommended-badge">Recommended</span>
              </div>

              <h4 className="mt-3">Artificial Intelligence</h4>
              <p className="text-muted">CS403 • 4 Credits</p>

              <div className="prerequisite-box">
                ✓ Prerequisite: CS401 ✓
              </div>

              <Button className="add-plan-btn mt-4 w-100">
                Add to Plan
              </Button>
            </Card>
          </Col>

          {/* ===== BLOCKCHAIN CARD ===== */}
          <Col md={6}>
            <Card className="recommend-card p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="icon-box-green">
                  <FaBookOpen />
                </div>
                <span className="recommended-badge">Recommended</span>
              </div>

              <h4 className="mt-3">Blockchain Technology</h4>
              <p className="text-muted">CS404 • 3 Credits</p>

              <Button className="add-plan-btn mt-4 w-100">
                Add to Plan
              </Button>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}
