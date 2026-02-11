import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {

  const [student, setStudent] = useState(null);

  /* ✅ GLOBAL LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setStudent(null);
  };

  return (
    <StudentContext.Provider value={{ student, setStudent, logout }}>
      {children}
    </StudentContext.Provider>
  );
}
