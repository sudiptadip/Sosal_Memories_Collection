import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import {  Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"))
  console.log(user)
  return (
    <>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" replace />} />
      </Routes>
    </>
  );
}

export default App;
