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
        <div className="initials">EA</div>
        <span className="username">Elen Berhane Alem</span>
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="dropdown">
          <p><strong>Your inbox</strong></p>
          <div className="dropdown-user">
            <div className="initials">EA</div>
            <span>Elen Berhane Alem</span>
          </div>
          <ul>
            <li>➕ Create new business account</li>
            <li>🤍 Tell your friends about Kivra</li>
            <li>❔ Help</li>
          </ul>
          <button onClick={handleLogout} className="logout">Log out</button>
          <button className="logout-all">Log out of all devices</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
