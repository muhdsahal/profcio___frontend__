import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login"; // Correct import
import ConfirmMail from "./pages/ConfirmMail";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/" />
          <Route Component={Signup} path="/signup" />
          <Route Component={Login} path="/login" />
          <Route Component={ConfirmMail} path="/confirm" />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
