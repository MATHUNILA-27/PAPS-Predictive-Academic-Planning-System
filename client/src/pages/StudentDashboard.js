import { Container, Row, Col, Card, Nav,Navbar, Image } from "react-bootstrap";
import { FaBell, FaStar, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dashboard.css";


export default function StudentDashboard() {
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

    <Nav.Link>Recommendations</Nav.Link>
    <Nav.Link>Goals</Nav.Link>

  </Nav>
</div>


      {/* ===== MAIN CONTENT ===== */}
      <Container fluid className="p-4">

        {/* WELCOME CARD */}
        <Card className="welcome-card p-4 text-white">
          <h2>Welcome back, Emma! 👋</h2>
          <p>Here's your academic overview for this semester</p>
        </Card>

        {/* STATS */}
        <Row className="mt-4 g-4">
          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Current CGPA</h6>
              <h2>8.7</h2>
              <div className="progress-bar-green"></div>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Attendance</h6>
              <h2>92%</h2>
              <div className="progress-bar-green"></div>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Current Semester</h6>
              <h2>6</h2>
              <p>2 courses enrolled</p>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="stat-box p-3">
              <h6>Avg. Marks</h6>
              <h2>88</h2>
              <p>This semester</p>
            </Card>
          </Col>
        </Row>

        {/* PERFORMANCE ALERT */}
        <Card className="performance-card mt-4 p-4">
          <div className="d-flex align-items-center">
            <FaStar size={24} className="me-3 text-success" />
            <div>
              <h5>Excellent Performance! Keep it up!</h5>
              <p>
                Your academic performance is outstanding. Continue maintaining
                your excellent work ethic and study habits.
              </p>
            </div>
          </div>
        </Card>
      {/* ===== NOTIFICATIONS SECTION ===== */}
      <Card className="notification-card mt-4 p-4">
        <div className="d-flex align-items-center mb-3">
          <FaBell className="me-2 text-primary" />
          <h5 className="m-0">Notifications</h5>
        </div>

        <Card className="notification-item p-3">
          <h6 className="mb-1">Course Registration Open</h6>
          <p className="m-0 text-muted">
            Registration for Semester 7 courses is now open
          </p>
        </Card>
      </Card>

      </Container>
    </div>
  );
}
