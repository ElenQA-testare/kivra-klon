// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Ta bort token
    navigate("/login"); // Skicka användaren till login-sidan
  };

  return (
    <button 
      onClick={handleLogout} 
      className="nav-btn logout-btn" 
      style={{
        backgroundColor: "#ff4d4d",
        border: "none",
        padding: "8px 15px",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      🔒 Log out
    </button>
  );
}

export default LogoutButton;
