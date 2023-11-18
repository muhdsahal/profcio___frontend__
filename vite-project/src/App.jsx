import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login"; // Correct import
import ConfirmMail from "./pages/ConfirmMail";
import Home from "./pages/Home/Home";
import employeeSignup from "./pages/employee/employeeSignup";
import employeeVerification from './pages/employeeVerification'
import employeeDashboard from "./pages/employee/employee";
import  EmployeeLogin  from "./pages/employee/employeeLogin";

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/" />
          <Route Component={Signup} path="/signup" />
          <Route Component={Login} path="/login" />
          <Route Component={ConfirmMail} path="/confirm" />
          <Route Component={employeeSignup} path="/employeesignup" />
          <Route Component={EmployeeLogin} path="/employeelogin" />
          <Route Component={employeeVerification} path="/employeeverification" />
          <Route Component={employeeDashboard} path="/employee" />

          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
