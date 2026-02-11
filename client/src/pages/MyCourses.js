import { Container, Row, Col, Card, Navbar,Nav, Image } from "react-bootstrap";
import { FaBell, FaChartLine} from "react-icons/fa";
import { Link } from "react-router-dom";



import "./dashboard.css";

export default function MyCourses() {
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
          <FaBell className="me-4" size={18} />
          <Image
            src="https://i.pravatar.cc/40"
            roundedCircle
            className="me-2"
          />
          <div>
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


      {/* ===== COURSES CONTENT ===== */}
      <Container fluid className="p-4">
        <h3 className="fw-bold mb-4">Current Semester Courses</h3>

        <Row className="g-4">

          {/* ===== MACHINE LEARNING CARD ===== */}
          <Col md={6}>
            <Card className="course-card p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Machine Learning</h4>
                  <p className="text-muted">CS401 • 4 Credits</p>
                </div>
                <span className="grade-badge">Grade: A</span>
              </div>

              <Row className="mt-3">
                <Col md={6}>
                  <div className="course-stat">
                    <p>Marks</p>
                    <h3>90</h3>
                    <div className="progress-bar-green"></div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="course-stat">
                    <p>Attendance</p>
                    <h3>94%</h3>
                    <div className="progress-bar-green"></div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* ===== CLOUD COMPUTING CARD ===== */}
          <Col md={6}>
            <Card className="course-card p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Cloud Computing</h4>
                  <p className="text-muted">CS402 • 3 Credits</p>
                </div>
                <span className="grade-badge">Grade: A-</span>
              </div>

              <Row className="mt-3">
                <Col md={6}>
                  <div className="course-stat">
                    <p>Marks</p>
                    <h3>86</h3>
                    <div className="progress-bar-green"></div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="course-stat">
                    <p>Attendance</p>
                    <h3>92%</h3>
                    <div className="progress-bar-green"></div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}
