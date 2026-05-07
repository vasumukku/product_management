import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul className="menu">
        <li onClick={() => navigate("/MainLayout")}>Dashboard</li>
        <li onClick={() => navigate("/categories")}>Categories</li>
        <li onClick={() => navigate("/products")}>Products</li>
        {/* <li onClick={() => navigate("/settings")}>Settings</li> */}
      </ul>

      <div className="logout" onClick={() => navigate("/")}>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;