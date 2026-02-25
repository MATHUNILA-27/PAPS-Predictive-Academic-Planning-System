import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if(token && userId){
      setUser({token,role,name,userId});
    }

    setLoading(false);

  },[]);

  const login = (data)=>{
    localStorage.setItem("token",data.token);
    localStorage.setItem("userId",data.user._id);
    localStorage.setItem("name",data.user.fullName);
    localStorage.setItem("role",data.user.role);

    setUser({
      token:data.token,
      role:data.user.role,
      name:data.user.fullName,
      userId:data.user._id
    });
  };

  const logout=()=>{
    localStorage.clear();
    setUser(null);
  };

  return(
    <AuthContext.Provider value={{user,login,logout,loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=>useContext(AuthContext);