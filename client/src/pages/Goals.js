import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Image
} from "react-bootstrap";
import { FaBell, FaBullseye, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Goals() {

  const goals = [
    {
      title: "Improve CGPA to 9.0",
      desc: "Achieve 9.0 CGPA by end of current semester",
      progress: 97,
      current: "8.7",
      target: "9",
      due: "5/30/2026",
    },
    {
      title: "Maintain 95% Attendance",
      desc: "Keep attendance above 95% for all courses",
      progress: 97,
      current: "92",
      target: "95",
      due: "5/30/2026",
    },
    {
      title: "Complete Machine Learning Project",
      desc: "Finish final project with excellent grade",
      progress: 75,
      current: "75",
      target: "100",
      due: "4/15/2026",
    },
  ];

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
          <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>

          <Nav.Link as={Link} to="/goals" className="active-tab">
            <FaBullseye className="me-1"/> Goals
          </Nav.Link>
        </Nav>
      </div>

      {/* ===== CONTENT ===== */}
      <Container fluid className="p-4">
        <h3 className="fw-bold mb-4">Academic Goals & Progress</h3>

        {/* ===== GOAL PROGRESS CARD ===== */}
        <Card className="goal-progress-card p-4 text-white">
          <div className="d-flex justify-content-between">
            <h4>Goal Progress</h4>
            <h2>0%</h2>
          </div>

          <div className="goal-progress-bar mt-3"></div>

          <p className="mt-3">0 of 3 goals completed</p>
        </Card>

        {/* ===== ADD NEW GOAL ===== */}
        <div className="add-goal-box mt-4">
          <FaPlus className="me-2"/> Add New Goal
        </div>

        {/* ===== GOALS LIST ===== */}
        {goals.map((g,i)=>(
          <Card key={i} className="goal-item p-4 mt-4">
            <Row>
              <Col md={11}>
                <div className="d-flex align-items-start">
                  <div className="goal-radio"></div>
                  <div>
                    <h5>{g.title}</h5>
                    <p className="text-muted">{g.desc}</p>
                  </div>
                </div>

                <p className="mb-1">Progress</p>

                <div className="goal-progress-container">
                  <div
                    className="goal-progress-fill"
                    style={{width:`${g.progress}%`}}
                  ></div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <span>Current: {g.current} &nbsp; Target: {g.target}</span>
                  <span>Due: {g.due}</span>
                </div>
              </Col>

              <Col md={1} className="text-end">
                <FaTrash className="text-danger"/>
              </Col>
            </Row>
          </Card>
        ))}

      </Container>
    </div>
  );
}
