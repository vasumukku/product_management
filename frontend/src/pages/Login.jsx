import React, { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.includes("@")) {
      toast.error("Invalid email ");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login Success ");
        navigate("/MainLayout")
      } else {
        toast.error(data.message || "Login Failed ");
      }
    } catch {
      toast.error("Server Error ");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="login-wrapper">
        
        {/* left side */}
       <div className="left">
    <img
      src="https://img.freepik.com/free-vector/shield_78370-582.jpg?semt=ais_hybrid&w=740&q=80"
      alt="security"
      className="shield-img"
  />
  <h1>Welcome Back</h1>
  <p>Access your secure dashboard</p>
</div>

        {/* Card */}
        <div className="login-card">
          <label>Email</label>
          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-row">
            <label>Password</label>
            <span
              className="link"
              onClick={() => navigate("/forgot")}
            >
              Forgot Password?
            </span>
          </div>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p className="signup">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signin")}>
              Sign In
            </span>
          </p>
        </div>

      </div>
    </>
  );
}

export default Login;