import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";

function Home() {
  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      Sunflag Global Hospital – Home
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

