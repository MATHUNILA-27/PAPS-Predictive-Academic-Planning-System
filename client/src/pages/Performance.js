import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Image,
} from "react-bootstrap";
import {
  FaBell,
  FaChartLine
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { Link } from "react-router-dom";

import "./dashboard.css";

export default function Performance() {

  // ===== BAR CHART DATA =====
  const courseData = [
    { name: "CS401", Marks: 90, Attendance: 96 },
    { name: "CS402", Marks: 86, Attendance: 94 },
  ];

  // ===== RADAR DATA =====
  const radarData = [
    { subject: "Academic", A: 90 },
    { subject: "Attendance", A: 88 },
    { subject: "Consistency", A: 85 },
    { subject: "Engagement", A: 80 },
    { subject: "Assignment", A: 82 },
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

      {/* ===== NAV BAR ===== */}
<div className="menu-bar px-4">
  <Nav>

    <Nav.Link as={Link} to="/student-dashboard">
      Dashboard
    </Nav.Link>

    <Nav.Link as={Link} to="/my-courses">
      My Courses
    </Nav.Link>

    <Nav.Link as={Link} to="/performance" className="active-tab">
      <FaChartLine className="me-1" /> Performance
    </Nav.Link>

    <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>
    <Nav.Link as={Link} to="/goals">Goals</Nav.Link>

  </Nav>
</div>


      {/* ===== CONTENT ===== */}
      <Container fluid className="p-4">
        <h3 className="fw-bold mb-4">Academic Performance Analysis</h3>

        {/* ===== BAR CHART ===== */}
        <Card className="p-4 mb-4">
          <h5>Current Semester Course Performance</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Marks" fill="#3b82f6" />
              <Bar dataKey="Attendance" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* ===== RADAR CHART ===== */}
        <Card className="p-4 mb-4 text-center">
          <h5>Overall Performance Assessment</h5>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar dataKey="A" fill="#7c3aed" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* ===== CGPA + SUMMARY ===== */}
        <Row className="g-4">

          {/* CGPA TREND */}
          <Col md={6}>
            <Card className="p-4">
              <h5>Semester-wise CGPA Trend</h5>

              {[
                { sem: "Sem 1", cgpa: 7.9 },
                { sem: "Sem 2", cgpa: 8.1 },
                { sem: "Sem 3", cgpa: 8.3 },
                { sem: "Sem 4", cgpa: 8.4 },
                { sem: "Sem 5", cgpa: 8.5 },
                { sem: "Sem 6", cgpa: 8.7 },
              ].map((item, i) => (
                <div key={i} className="cgpa-row">
                  <span>{item.sem}</span>
                  <div className="cgpa-bar">
                    <div
                      className="cgpa-fill"
                      style={{ width: `${item.cgpa * 10}%` }}
                    ></div>
                  </div>
                  <span>{item.cgpa}</span>
                </div>
              ))}
            </Card>
          </Col>

          {/* SUMMARY */}
          <Col md={6}>
            <Card className="p-4">
              <h5>Course Performance Summary</h5>

              <div className="summary excellent">
                Excellent (80+) <span>2</span>
              </div>

              <div className="summary good">
                Good (60-79) <span>0</span>
              </div>

              <div className="summary poor">
                Needs Improvement (&lt;60) <span>0</span>
              </div>

            </Card>
          </Col>

        </Row>

      </Container>
    </div>
  );
}
