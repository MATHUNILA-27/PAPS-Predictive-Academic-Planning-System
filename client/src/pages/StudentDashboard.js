import React, { useEffect } from "react";
import { Container, Row, Col, Card, Nav, Navbar } from "react-bootstrap";
import { FaBell, FaStar, FaChartLine } from "react-icons/fa";
import { useStudent } from "../context/StudentContext";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import api from "../utils/axiosConfig";

export default function StudentDashboard() {

  const { student, loadStudent, setStudent } = useStudent();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!student) loadStudent();
  },[student, loadStudent]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!student) return <h3 className="p-4">Loading...</h3>;

  const courses = student.courses || [];

  const avgMarks = courses.length
    ? Math.round(courses.reduce((a,c)=>a+(c.marks||0),0)/courses.length)
    : 0;

  /* ================= NEW SMART FEATURES ================= */

  /* PERFORMANCE SUMMARY */
  const excellent = courses.filter(c=>c.marks>=80).length;
  const good = courses.filter(c=>c.marks>=60 && c.marks<80).length;
  const poor = courses.filter(c=>c.marks<60).length;

  /* ATTENDANCE TREND (simple average + status) */
  const attendanceStatus =
    student.attendance >= 85 ? "Excellent"
    : student.attendance >= 75 ? "Good"
    : student.attendance >= 65 ? "Average"
    : "Low";

  /* UPCOMING DEADLINES (use goals due dates) */
  const upcomingDeadlines = (student.goals||[])
    .filter(g=>g.due)
    .sort((a,b)=>new Date(a.due)-new Date(b.due))
    .slice(0,3);

  /* RISK LEVEL */
  let risk="Low";
  if(student.cgpa<6 || student.attendance<65) risk="High";
  else if(student.cgpa<7 || student.attendance<75) risk="Medium";

  /* ====================================================== */

  const saveProfile = async()=>{

    const userId = localStorage.getItem("userId");

    try{
      const res = await api.put(`/student/profile/${userId}`,{
        cgpa: student.cgpa,
        attendance: student.attendance,
        semester: student.semester
      });

      setStudent(res.data);
      alert("Saved");

    }catch(err){
      console.log(err);
      alert("Save failed");
    }
  };

  return (
    <div className="dashboard-bg">

      {/* NAVBAR */}
      <Navbar className="topbar px-4">
        <div className="d-flex align-items-center">
          <div className="logo-box me-3">🎓</div>
          <div>
            <h5 className="text-white m-0">Student Portal</h5>
            <small className="text-light">Academic Planning & Progress</small>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center text-white">
          <FaBell className="me-4"/>
          <div>
            <div>{student.fullName || "Student"}</div>
            <small>{student.userId || student._id}</small>
          </div>
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
      </Navbar>

      {/* MENU */}
      <div className="menu-bar px-4">
        <Nav>
          <Nav.Link as={Link} to="/student-dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/my-courses">My Courses</Nav.Link>
          <Nav.Link as={Link} to="/performance">
            <FaChartLine className="me-1"/> Performance
          </Nav.Link>
          <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>
          <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
        </Nav>
      </div>

      <Container fluid className="p-4">

        {/* WELCOME */}
        <Card className="welcome-card p-4 text-white">
          <h2>Welcome back, {student.fullName || "Student"}! 👋</h2>
          <p>Here's your academic overview for this semester</p>
        </Card>

        {/* MAIN STATS */}
        <Row className="mt-4 g-4">

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Current CGPA</h6>
              <h2>{student.cgpa ?? 0}</h2>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Attendance</h6>
              <h2>{student.attendance ?? 0}%</h2>
              <small>{attendanceStatus}</small>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Current Semester</h6>
              <h2>{student.semester ?? "-"}</h2>
              <p>{courses.length} courses enrolled</p>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Avg. Marks</h6>
              <h2>{avgMarks}</h2>
            </Card>
          </Col>

        </Row>

        {/* NEW SMART CARDS */}
        <Row className="mt-4 g-4">

          {/* PERFORMANCE SUMMARY */}
          <Col md={4}>
            <Card className="p-4">
              <h5>Performance Summary</h5>
              <p>Excellent: {excellent}</p>
              <p>Good: {good}</p>
              <p>Needs Improvement: {poor}</p>
            </Card>
          </Col>

          {/* UPCOMING DEADLINES */}
          <Col md={4}>
            <Card className="p-4">
              <h5>Upcoming Deadlines</h5>
              {upcomingDeadlines.length===0 && <p>No upcoming goals</p>}
              {upcomingDeadlines.map((g,i)=>(
                <div key={i}>
                  <b>{g.title}</b>
                  <div>{g.due}</div>
                </div>
              ))}
            </Card>
          </Col>

          {/* RISK LEVEL */}
          <Col md={4}>
            <Card className="p-4">
              <h5>Risk Level Indicator</h5>
              <h3 style={{
                color:
                  risk==="High"?"red":
                  risk==="Medium"?"orange":"green"
              }}>
                {risk}
              </h3>
              <small>
                Based on CGPA & attendance
              </small>
            </Card>
          </Col>

        </Row>

        {/* EXISTING PERFORMANCE CARD */}
        <Card className="performance-card mt-4 p-4">
          <div className="d-flex align-items-center">
            <FaStar size={24} className="me-3 text-success" />
            <div>
              <h5>Excellent Performance! Keep it up!</h5>
              <p>Your academic performance is outstanding.</p>
            </div>
          </div>
        </Card>

        {/* EDIT PROFILE */}
        <Card className="p-4 mt-4">
          <h5>Edit Academic Details</h5>

          <input
            placeholder="CGPA"
            value={student.cgpa || ""}
            onChange={e=>setStudent({...student,cgpa:e.target.value})}
          />

          <input
            placeholder="Attendance"
            value={student.attendance || ""}
            onChange={e=>setStudent({...student,attendance:e.target.value})}
          />

          <input
            placeholder="Semester"
            value={student.semester || ""}
            onChange={e=>setStudent({...student,semester:e.target.value})}
          />

          <button onClick={saveProfile}>
            Save Details
          </button>

        </Card>

      </Container>

    </div>
  );
}