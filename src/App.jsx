import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Doctors from "./admin/Doctors";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<Doctors />} />
    </Routes>
  );
}

