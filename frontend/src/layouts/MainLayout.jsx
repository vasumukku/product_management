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

          <h1>Dashboard</h1>
        <p>This is dashboard content</p>
        </div>
        
      </div>
    </>
  );
}

export default MainLayout;