import React, { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful ");

       
        setTimeout(() => {
          navigate("/");
        }, 2000);

      } else {
        toast.error(data.message || "Signup failed ");
      }
    } catch {
      toast.error("Server error ");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="login-wrapper">

        {/* LEFT SAME DESIGN */}
        <div className="left">
          <img
            src="https://img.freepik.com/free-vector/shield_78370-582.jpg?semt=ais_hybrid&w=740&q=80"
            alt="security"
            className="shield-img"
          />
          <h1>Create Account</h1>
          <p>Start your secure journey</p>
        </div>

        {/* CARD */}
        <div className="login-card">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignup}>Sign Up</button>

          {/* Go to Login */}
          <p className="signup">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;