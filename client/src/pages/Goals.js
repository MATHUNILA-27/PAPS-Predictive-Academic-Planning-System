import React,{useEffect} from "react";
import {Container,Row,Col,Card,Navbar,Nav} from "react-bootstrap";
import {FaBell,FaBullseye,FaTrash,FaPlus} from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import { useStudent } from "../context/StudentContext";

export default function Goals(){

  const navigate = useNavigate();
  

  const getUserId = ()=> localStorage.getItem("userId");

  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  /* NORMALIZE DATA */
  const normalizeGoals = (data) => ({
    ...data,
    goals:(data.goals||[]).map(g=>({
      title:g.title||"",
      desc:g.desc||"",
      progress:Number(g.progress)||0,
      current:Number(g.current)||0,
      target:Number(g.target)||100,
      due:g.due||""
    }))
  });

  /* LOAD STUDENT */
  const { student, setStudent, loadStudent} = useStudent();
   useEffect(() => {
     if(!student) loadStudent();
    },[student,loadStudent]);
  if(!student) return <h3 className="p-4">Loading...</h3>;

  const goals=student.goals||[];

  //const completed=goals.filter(g=>g.progress===100).length;
  //const percent=goals.length?Math.round((completed/goals.length)*100):0;

  /* PROGRESS CALC */
  const calcProgress=(g)=>{
    if(!g.target) return 0;
    return Math.min(100,Math.round((Number(g.current)||0)/Number(g.target)*100));
  };

  /* ADD GOAL */
  const addGoal=async()=>{

    const userId=getUserId();

    const newGoal={
      title:"New Goal",
      desc:"Describe your goal",
      progress:0,
      current:0,
      target:100,
      due:""
    };

    try{
      const res=await axios.post(
        `http://localhost:5000/api/student/goal/${userId}`,
        newGoal
      );
      setStudent(normalizeGoals(res.data));
    }catch(err){
      console.log("Add goal error:",err);
    }
  };

  /* DELETE */
  const deleteGoal=async(index)=>{

    const userId=getUserId();
    const updated=goals.filter((_,i)=>i!==index);

    try{
      const res=await axios.put(
        `http://localhost:5000/api/student/goals/${userId}`,
        updated
      );
      setStudent(normalizeGoals(res.data));
    }catch(err){
      console.log("Delete goal error:",err);
    }
  };

  /* EDIT */
  const editGoal=async(index,field,value)=>{

    const userId=getUserId();

    const updated=[...goals];
    updated[index]={...updated[index],[field]:value};
    updated[index].progress=calcProgress(updated[index]);

    try{
      const res=await axios.put(
        `http://localhost:5000/api/student/goals/${userId}`,
        updated
      );
      setStudent(normalizeGoals(res.data));
    }catch(err){
      console.log("Edit goal error:",err);
    }
  };

  return(
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
          <FaBell className="me-4"/>
          <div className="ms-2">
            <div>{student.fullName||"Student"}</div>
            <small>{student.userId}</small>
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
          <Nav.Link as={Link} to="/performance">Performance</Nav.Link>
          <Nav.Link as={Link} to="/recommendations">Recommendations</Nav.Link>
          <Nav.Link as={Link} to="/goals" className="active-tab">
            <FaBullseye className="me-1"/> Goals
          </Nav.Link>
        </Nav>
      </div>

      <Container fluid className="p-4">

        <h3 className="fw-bold mb-4">Academic Goals & Progress</h3>

        {/* <Card className="goal-progress-card p-4 text-white">
          <div className="d-flex justify-content-between">
            <h4>Goal Progress</h4>
            <h2>{percent}%</h2>
          </div>
          <div className="goal-progress-bar mt-3"></div>
          <p className="mt-3">{completed} of {goals.length} goals completed</p>
        </Card> */}

        <div className="add-goal-box mt-4" onClick={addGoal}>
          <FaPlus className="me-2"/> Add New Goal
        </div>

        {goals.map((g,i)=>{

          const prog=calcProgress(g);

          return(
          <Card key={i} className="goal-progress-card p-4 text-white goal-item p-4 mt-4">
            <Row>

              <Col md={11}>

                <div className="d-flex align-items-start">
                  <div className="goal-radio"></div>

                  <div>
                    <input
                      className="goal-title-input"
                      value={g.title}
                      onChange={e=>editGoal(i,"title",e.target.value)}
                    />

                    <input
                      className="goal-desc-input"
                      value={g.desc}
                      onChange={e=>editGoal(i,"desc",e.target.value)}
                    />
                  </div>
                </div>

                <p className="mb-1">Progress</p>

                <div className="goal-progress-container">
                  <div className="goal-progress-fill"
                    style={{width:`${prog}%`}}></div>
                </div>

                <div className="d-flex justify-content-between mt-2">

                  <span>
                    Current:
                    <input
                      className="goal-number-input"
                      value={g.current}
                      onChange={e=>editGoal(i,"current",e.target.value)}
                    />

                    Target:
                    <input
                      className="goal-number-input"
                      value={g.target}
                      onChange={e=>editGoal(i,"target",e.target.value)}
                    />
                  </span>

                  <input
                    type="date"
                    className="goal-date-input"
                    value={g.due}
                    onChange={e=>editGoal(i,"due",e.target.value)}
                  />

                </div>

              </Col>

              <Col md={1} className="text-end">
                <FaTrash
                  className="white"
                  style={{cursor:"pointer"}}
                  onClick={()=>deleteGoal(i)}
                />
              </Col>

            </Row>
          </Card>
        )})}

      </Container>
    </div>
  );
}