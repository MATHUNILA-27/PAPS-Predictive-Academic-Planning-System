import React, { useEffect} from "react";
import {
  Container, Row, Col, Card, Navbar, Nav, Button
} from "react-bootstrap";
import { FaBell, FaStar, FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useStudent } from "../context/StudentContext";
import api from "../utils/axiosConfig";

export default function Recommendations() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const { student, setStudent, loadStudent} = useStudent();
  useEffect(() => {
    if(!student) loadStudent();
   },[student,loadStudent]);

  /* ✅ FIX: DEFINE RECOMMENDATIONS ARRAY */
  const recommendations = [
    { name:"Artificial Intelligence", code:"CS403", credits:4, prerequisite:"CS401" },
    { name:"Blockchain Technology", code:"CS404", credits:3 }
  ];

 
  if(!student) return <h3 className="p-4">Loading...</h3>;

  /* ADD COURSE TO MONGODB */
  const addCourse = async(course)=>{

    const userId = localStorage.getItem("userId");

    const exists = (student.courses || []).some(c=>c.code===course.code);
    if(exists){
      alert("Course already added");
      return;
    }

    const updated = [
      ...(student.courses || []),
      { ...course, marks:0, attendance:0 }
    ];

    try{
      const res = await api.put(
        `/student/courses/${userId}`,
        updated
      );
      setStudent(res.data);
    }catch(err){
      console.log("Add course error:",err);
    }
  };

  return (
    <div className="dashboard-bg">

      {/* TOP NAVBAR */}
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
          <div className="ms-2">
            <div>{student.fullName || "Student"}</div>
            <small>{student.userId || student._id}</small>
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
          }}
        >
          Logout
        </button>
      </Navbar>

      {/* MENU */}
      <div className="menu-bar px-4">
        <Nav>
          <Nav.Link as={Link} to="/student-dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/my-courses">My Courses</Nav.Link>
          <Nav.Link as={Link} to="/performance">Performance</Nav.Link>

          <Nav.Link as={Link} to="/recommendations" className="active-tab">
            <FaStar className="me-1"/> Recommendations
          </Nav.Link>

          <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
        </Nav>
      </div>

      {/* CONTENT */}
      <Container fluid className="p-4">

        <h3 className="fw-bold mb-4">
          Course Recommendations for Next Semester
        </h3>

        <Row className="g-4">

          {recommendations.map((course,i)=>(
            <Col md={6} key={i}>
              <Card className="recommend-card p-4">

                <div className="d-flex justify-content-between">
                  <div className="icon-box-green"><FaBookOpen/></div>
                  <span className="recommended-badge">Recommended</span>
                </div>

                <h4 className="mt-3">{course.name}</h4>

                <p className="text-muted">
                  {course.code} • {course.credits} Credits
                </p>

                {course.prerequisite &&
                  <div className="prerequisite-box">
                    ✓ Prerequisite: {course.prerequisite} ✓
                  </div>
                }

                <Button
                  className="add-plan-btn mt-4 w-100 btn primary"
                  onClick={()=>addCourse(course)}
                >
                  Add to Plan
                </Button>

              </Card>
            </Col>
          ))}

        </Row>

      </Container>

    </div>
  );
}
