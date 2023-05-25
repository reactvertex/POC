import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/signUp";
import SignIn from "./pages/login";

const Routers = () => {
  return (
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/signup" element={ <SignUp />} />
        <Route path="/login" element={ <SignIn />} />
      </Routes>

  )
}
export default Routers;