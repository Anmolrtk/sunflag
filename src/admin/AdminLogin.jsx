import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      console.log("Logged in UID:", uid);

      const adminDoc = await getDoc(doc(db, "admins", uid));

      if (!adminDoc.exists()) {
        setError("Not an admin user");
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 mt-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
