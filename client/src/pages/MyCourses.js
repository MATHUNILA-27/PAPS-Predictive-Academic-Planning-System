import { Container, Row, Col, Card, Navbar, Nav } from "react-bootstrap";
import { FaBell, FaChartLine } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStudent } from "../context/StudentContext";
import "./dashboard.css";

export default function MyCourses() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const { student, loadStudent } = useStudent();

  useEffect(() => {
    if(!student) loadStudent();
  },[student,loadStudent]);

  if(!student) return <h3 className="p-4">Loading...</h3>;

  const courses = student.courses || [];

  /* ========= SMART FEATURES ========= */

  const getStudyHours = (c)=>{
    if((c.marks ?? 0) < 50 || (c.attendance ?? 0) < 65) return "3-4 hrs/day";
    if((c.marks ?? 0) < 70) return "2-3 hrs/day";
    return "1-2 hrs/day";
  };

  const isWeak = (c)=>
    (c.marks ?? 0) < 60 || (c.attendance ?? 0) < 70;

  const getResource = (name)=>{
    const n = name?.toLowerCase() || "";

    if(n.includes("java"))
      return "https://www.w3schools.com/java/";
    if(n.includes("python"))
      return "https://www.w3schools.com/python/";
    if(n.includes("ai"))
      return "https://www.geeksforgeeks.org/artificial-intelligence/";
    if(n.includes("db") || n.includes("sql"))
      return "https://www.w3schools.com/sql/";

    return "https://www.geeksforgeeks.org/";
  };

  /* ================================== */

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
          <FaBell className="me-4" size={18}/>
          <div>
            <div>{student.fullName || "Student"}</div>
            <small>{student._id}</small>
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

      {/* CONTENT */}
      <Container fluid className="p-4">

        <h3 className="fw-bold mb-4">Current Semester Courses</h3>

        <Row className="g-4">

          {courses.length===0 && <h5>No courses added yet.</h5>}

          {courses.map((course,index)=>{

            const weak = isWeak(course);

            return(
            <Col md={6} key={index}>
              <Card className="course-card p-4">

                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{course.name}</h4>
                    <p className="text-muted">
                      {course.code} • {course.credits} Credits
                    </p>
                  </div>

                  <span className="grade-badge">
                    Grade: {course.grade || "-"}
                  </span>
                </div>

                <Row className="mt-3">

                  <Col md={6}>
                    <div className="course-stat">
                      <p>Marks</p>
                      <h3>{course.marks ?? 0}</h3>
                      <div className="progress-bar-green"></div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="course-stat">
                      <p>Attendance</p>
                      <h3>{course.attendance ?? 0}%</h3>
                      <div className="progress-bar-green"></div>
                    </div>
                  </Col>

                </Row>

                {/* ===== NEW SMART INFO ===== */}

                <div className="mt-3">

                  <p>
                    <b>Suggested Study:</b> {getStudyHours(course)}
                  </p>

                  {weak && (
                    <p style={{color:"red",fontWeight:"600"}}>
                      Weak Subject — Needs Focus
                    </p>
                  )}

                  <a
                    href={getResource(course.name)}
                    target="_blank"
                    rel="noreferrer"
                    style={{fontWeight:"500"}}
                  >
                    Practice Resources →
                  </a>

                </div>

              </Card>
            </Col>
          )})}

        </Row>

      </Container>
    </div>
  );
}