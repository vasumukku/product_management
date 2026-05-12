// FILE NAME: Login.jsx

import React, {
  useEffect,
  useState
} from "react";

import "./Login.css";

import Navbar from "../components/Navbar";

import {
  useNavigate
} from "react-router-dom";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Login() {

  const navigate =
    useNavigate();

  const [email,
    setEmail]
    = useState("");

  const [password,
    setPassword]
    = useState("");




  // AUTO LOGIN
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      navigate(
        "/MainLayout"
      );

    }

  }, []);




  // LOGIN
  const handleLogin =
    async () => {

    // EMAIL CHECK
    if (
      !email.includes("@")
    ) {

      toast.error(
        "Invalid email"
      );

      return;

    }

    try {

      // API
      const res =
        await fetch(
          "http://localhost:5000/api/auth/login",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              email,

              password,

            }),

          }
        );



      // JSON
      const data =
        await res.json();



      // SUCCESS
      if (res.ok) {

        // STORE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        toast.success(
          "Login Success"
        );

        // REDIRECT
        navigate(
          "/MainLayout"
        );

      } else {

        toast.error(
          data.message ||
          "Login Failed"
        );

      }

    } catch (err) {

      toast.error(
        "Server Error"
      );

    }

  };




  return (

    <>
      <Navbar />



      <ToastContainer
        position="top-right"
        autoClose={2000}
      />



      <div className=
        "login-wrapper"
      >

        {/* LEFT */}
        <div className=
          "left"
        >

          <img
            src=
            "https://img.freepik.com/free-vector/shield_78370-582.jpg?semt=ais_hybrid&w=740&q=80"

            alt="security"

            className=
            "shield-img"
          />

          <h1>
            Welcome Back
          </h1>

          <p>
            Access your secure dashboard
          </p>

        </div>



        {/* LOGIN CARD */}
        <div className=
          "login-card"
        >

          {/* EMAIL */}
          <label>
            Email
          </label>

          <input
            type="email"

            placeholder=
            "name@gmail.com"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />



          {/* PASSWORD ROW */}
          <div className=
            "password-row"
          >

            <label>
              Password
            </label>

            <span
              className=
              "link"

              onClick={() =>
                navigate(
                  "/forgot"
                )
              }
            >

              Forgot Password?

            </span>

          </div>



          {/* PASSWORD */}
          <input
            type="password"

            placeholder=
            "********"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />



          {/* LOGIN BUTTON */}
          <button
            onClick={
              handleLogin
            }
          >

            Login

          </button>



          {/* SIGNUP */}
          <p className=
            "signup"
          >

            Don’t have an account?{" "}

            <span
              onClick={() =>
                navigate(
                  "/signin"
                )
              }
            >

              Sign In

            </span>

          </p>

        </div>

      </div>

    </>

  );
}

export default Login;