import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserMenu from "./UserMenu";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Övre navbar */}
      <div className="top-nav">
        <button className="nav-btn active">Private</button>
        <button className="nav-btn">For business</button>
      </div>

      {/* Huvudnavbar */}
      <div className="main-nav">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate("/")}>KIVRA</div>
          <ul className="nav-links">
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/services">Our services</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="nav-btn">🇸🇪 Svenska</button>

          {token ? (
            <UserMenu />
          ) : (
            <>
              <button className="nav-btn" onClick={() => navigate("/login")}>Log in</button>
              <button className="nav-btn" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
