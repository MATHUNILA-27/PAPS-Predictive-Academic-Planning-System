import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/MyCourses";
import Recommendations from "./pages/Recommendations";
import Performance from "./pages/Performance";
import Goals from "./pages/Goals";
function App(){

// const token=localStorage.getItem("token");
// const role=localStorage.getItem("role");

return(
<Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/student-dashboard"
element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>}
/>

<Route path="/faculty-dashboard"
element={<ProtectedRoute role="faculty"><FacultyDashboard/></ProtectedRoute>}
/>

<Route path="/my-courses" element={<MyCourses/>}/>
<Route path="/performance" element={<Performance/>}/>
<Route path="/recommendations" element={<Recommendations/>}/>
<Route path="/goals" element={<Goals/>}/>

</Routes>
);
}

export default App;