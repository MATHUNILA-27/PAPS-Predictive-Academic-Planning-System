import {createContext,useContext,useState} from "react";
import api from "../utils/axiosConfig";

const StudentContext=createContext();

export function StudentProvider({children}){

const [student,setStudent]=useState(null);

const loadStudent=async()=>{
const id=localStorage.getItem("userId");
if(!id) return;
const res=await api.get(`/student/${id}`);
setStudent(res.data);
};

return(
<StudentContext.Provider value={{student,setStudent,loadStudent}}>
{children}
</StudentContext.Provider>
);
}

export const useStudent=()=>useContext(StudentContext);