import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserMenu from "./UserMenu";


function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="top-nav">{/* Här kan du lägga Private/Business */}</div>

      <div className="main-nav">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate("/")}>KIVRA</div>
          <ul className="nav-links">
            {/* Lägg till fler länkar om du vill */}
          </ul>
        </div>

        <div className="nav-right">
          {token && (
            <>
              <UserMenu />
              
            </>
          )}
          {/* Logga in och Registrera har tagits bort */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
