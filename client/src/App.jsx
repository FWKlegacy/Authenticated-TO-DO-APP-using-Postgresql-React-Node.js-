import React from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
//import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
