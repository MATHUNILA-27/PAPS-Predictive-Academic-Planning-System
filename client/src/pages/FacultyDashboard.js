import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Card, Navbar, Nav
} from "react-bootstrap";
import {
  FaBell,
  FaUsers,
  FaExclamationTriangle,
  FaChartLine,
  FaFileAlt
} from "react-icons/fa";
import "./faculty.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard(){
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ✅ THIS WAS MISSING */
  const [data,setData] = useState(null);

  /* LOAD DASHBOARD DATA */
  useEffect(()=>{

    const userId = localStorage.getItem("userId");
    if(!userId) return;

    axios.get(`http://localhost:5000/api/faculty/dashboard/${userId}`)
      .then(res=>setData(res.data))
      .catch(console.log);

  },[]);

  /* fallback values if backend not ready */
  const stats = [
    {
      title:"Total Advisees",
      value:data?.totalAdvisees ?? 4,
      icon:<FaUsers/>,
      bg:"#ede9fe"
    },
    {
      title:"At-Risk Students",
      value:data?.atRisk ?? 2,
      icon:<FaExclamationTriangle/>,
      bg:"#fee2e2"
    },
    {
      title:"Average CGPA",
      value:data?.avgCGPA ?? "7.45",
      icon:<FaChartLine/>,
      bg:"#dcfce7"
    },
    {
      title:"Notifications",
      value:data?.notifications?.length ?? 2,
      icon:<FaBell/>,
      bg:"#dbeafe"
    }
  ];

  const notifications = data?.notifications ?? [
    {
      title:"Performance Alert",
      text:"James Anderson is showing declining performance in CS401",
      date:"2/3/2026",
      color:"#fee2e2",
      border:"#fca5a5"
    },
    {
      title:"Low Attendance Warning",
      text:"Noah Garcia has 62% attendance - below threshold",
      date:"2/2/2026",
      color:"#fef9c3",
      border:"#facc15"
    },
    {
      title:"Excellent Performance",
      text:"Liam Brown achieved 9.1 CGPA - keep up the great work!",
      date:"1/30/2026",
      color:"#dcfce7",
      border:"#86efac"
    }
  ];

  return(
    <div className="faculty-bg">

      {/* ===== TOP HEADER ===== */}
      <Navbar className="faculty-top px-4">

        <div className="d-flex align-items-center">
          <div className="faculty-logo">🎓</div>

          <div className="ms-2">
            <h5 className="m-0 fw-bold">Faculty Portal</h5>
            <small className="text-muted">Academic Advising Dashboard</small>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center">

          <FaBell className="me-4"/>


          <div>
            <div className="fw-semibold">Padmavathi</div>
            <small className="text-muted">Faculty Advisor</small>
          </div>
          <button onClick={logout}
          style={{
            marginLeft:"15px",
            background:"red",
            border:"1px solid white",
            color:"white",
            padding:"4px 10px",
            borderRadius:"6px"
          }}>
          Logout
        </button>

        </div>

      </Navbar>

      {/* ===== TABS ===== */}
      <div className="faculty-tabs px-4">
        <Nav>
          <Nav.Link className="active">Overview</Nav.Link>
          <Nav.Link>My Advisees</Nav.Link>
          <Nav.Link>At-Risk Students</Nav.Link>
          <Nav.Link>Course Planning</Nav.Link>
        </Nav>
      </div>

      <Container fluid className="p-4">

        {/* ===== STAT CARDS ===== */}
        <Row className="g-4 mb-4">
          {stats.map((s,i)=>(
            <Col md={3} key={i}>
              <Card className="faculty-stat p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{s.title}</small>
                    <h2 className="fw-bold">{s.value}</h2>
                  </div>

                  <div
                    className="faculty-icon"
                    style={{background:s.bg}}
                  >
                    {s.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ===== NOTIFICATIONS ===== */}
        <Card className="p-4 mb-4">
          <h5 className="fw-bold mb-3">🔔 Recent Notifications</h5>

          {notifications.map((n,i)=>(
            <Card
              key={i}
              className="p-3 mb-3"
              style={{
                background:n.color,
                border:`1px solid ${n.border}`,
                borderRadius:"12px"
              }}
            >
              <h6 className="fw-bold">{n.title}</h6>
              <p className="m-0">{n.text}</p>
              <small className="text-muted">{n.date}</small>
            </Card>
          ))}
        </Card>

        {/* ===== ACTION CARDS ===== */}
        <Row className="g-4">

          <Col md={4}>
            <Card className="p-4 faculty-action">
              <FaUsers size={28} className="text-purple"/>
              <h5 className="mt-3">View All Advisees</h5>
              <p className="text-muted">
                Monitor student performance and progress
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 faculty-action">
              <FaExclamationTriangle size={28} className="text-danger"/>
              <h5 className="mt-3">At-Risk Students</h5>
              <p className="text-muted">
                Identify and support struggling students
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 faculty-action">
              <FaFileAlt size={28} className="text-success"/>
              <h5 className="mt-3">Course Planning</h5>
              <p className="text-muted">
                Provide course recommendations
              </p>
            </Card>
          </Col>

        </Row>

      </Container>
    </div>
  );
}