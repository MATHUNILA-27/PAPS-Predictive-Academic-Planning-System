import React, { useEffect, useMemo } from "react";
import {
  Container, Row, Col, Card, Navbar, Nav
} from "react-bootstrap";
import { FaBell, FaChartLine } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useStudent } from "../context/StudentContext";

export default function Performance() {

  const navigate = useNavigate();
  const { student, loadStudent} = useStudent();

  useEffect(()=>{
    if(!student) loadStudent();
  },[student,loadStudent])
  /* ✅ FIX 2 — memoized courses */
  const courses = useMemo(
    ()=> student?.courses ?? [],
    [student]
  );

  /* CHART DATA */
  const courseData = useMemo(() =>
    courses.map(c => ({
      name: c.code,
      Marks: c.marks || 0,
      Attendance: c.attendance || 0
    }))
  , [courses]);

  const radarData = useMemo(() => ([
    { subject: "Academic", A: (student?.cgpa || 0) * 10 },
    { subject: "Attendance", A: student?.attendance || 0 },
    { subject: "Consistency", A: courses.length * 15 },
    { subject: "Engagement", A: Math.max((student?.attendance || 0) - 5,0) },
    { subject: "Assignment", A: (student?.cgpa || 0) * 9 }
  ]), [student, courses]);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (!student) return <h3 className="p-4">Loading...</h3>;

  const excellent = courses.filter(c => c.marks >= 80).length;
  const good = courses.filter(c => c.marks >= 60 && c.marks < 80).length;
  const poor = courses.filter(c => c.marks < 60).length;

  return (
    <div className="dashboard-bg">

      <Navbar className="topbar px-4">
        <div className="d-flex align-items-center">
          <div className="logo-box me-3">🎓</div>
          <div>
            <h5 className="text-white m-0">Student Portal</h5>
            <small className="text-light">Academic Planning & Progress</small>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center text-white">
          <FaBell className="me-4" />
          <div className="ms-2">
            <div>{student.fullName || "Student"}</div>
            <small>{student._id}</small>
          </div>
        </div>

        <button onClick={logout}
          style={{
            marginLeft:"15px",
            background:"transparent",
            backgroundColor:"red",
            border:"1px solid white",
            color:"white",
            padding:"4px 10px",
            borderRadius:"6px"
          }}>
          Logout
        </button>
      </Navbar>

      <div className="menu-bar px-4">
        <Nav>
          <Nav.Link as={Link} to="/student-dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/my-courses">My Courses</Nav.Link>
          <Nav.Link as={Link} to="/performance" className="active-tab">
            <FaChartLine className="me-1" /> Performance
          </Nav.Link>
          <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>
          <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
        </Nav>
      </div>

      <Container fluid className="p-4">

        <h3 className="fw-bold mb-4">Academic Performance Analysis</h3>

        <Card className="p-4 mb-4">
          <h5>Current Semester Course Performance</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="Marks" fill="#3b82f6"/>
              <Bar dataKey="Attendance" fill="#10b981"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 mb-4 text-center">
          <h5>Overall Performance Assessment</h5>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid/>
              <PolarAngleAxis dataKey="subject"/>
              <Radar dataKey="A" fill="#7c3aed" fillOpacity={0.6}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Row className="g-4">

          <Col md={6}>
            <Card className="p-4">
              <h5>Semester-wise CGPA Trend</h5>

              {Array.from({ length: student.semester || 1 }).map((_,i)=>(
                <div key={i} className="cgpa-row">
                  <span>Sem {i+1}</span>
                  <div className="cgpa-bar">
                    <div className="cgpa-fill"
                      style={{ width:`${(student.cgpa||0)*10}%` }}></div>
                  </div>
                  <span>{student.cgpa||0}</span>
                </div>
              ))}
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4">
              <h5>Course Performance Summary</h5>

              <div className="summary excellent">
                Excellent (80+) <span>{excellent}</span>
              </div>

              <div className="summary good">
                Good (60-79) <span>{good}</span>
              </div>

              <div className="summary poor">
                Needs Improvement (&lt;60) <span>{poor}</span>
              </div>

            </Card>
          </Col>

        </Row>

      </Container>

    </div>
  );
}
