import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
