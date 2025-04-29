import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="user-menu">
      <div className="user-profile" onClick={() => setOpen(!open)}>
        
        
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="dropdown">
          <p><strong>Your inbox</strong></p>
          <div className="dropdown-user">
            
            
          </div>
          
            
            
          
          
          <button onClick={handleLogout} className="logout">Log out</button>
          
        </div>
      )}
    </div>
  );
}

export default UserMenu;
