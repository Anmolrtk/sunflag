import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="space-x-4 mb-6">
        <Link className="text-blue-600 underline" to="/admin/doctors">
          Manage Doctors
        </Link>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

