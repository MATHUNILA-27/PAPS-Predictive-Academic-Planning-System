export const getToken = ()=>localStorage.getItem("token");

export const logout = ()=>{
  localStorage.clear();
  window.location="/";
};