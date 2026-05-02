import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; 
import "./Layout.css";
import Dashboard from "../pages/Dashboard"

function MainLayout() {
  return (
    <>
      <Navbar /> 

      <div className="layout">
        <Sidebar />

        <div className="main-content">

          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default MainLayout;