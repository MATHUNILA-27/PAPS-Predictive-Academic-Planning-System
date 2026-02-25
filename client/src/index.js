import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StudentProvider } from "./context/StudentContext";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <StudentProvider>
    <App/>
  </StudentProvider>
  </BrowserRouter>
);