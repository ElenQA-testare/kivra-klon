// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Viktigt! Importera CSS-filen

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Text-sidan */}
        <div className="hero-text">
          <h1>For all the collectors out there</h1>
          <p>
            A paper here, a receipt there... Imagine letters, bills, receipts,
            uploads — all safely collected in one app. Smart, safe and good for the environment!
          </p>
          <button
            className="create-account-btn"
            onClick={() => navigate("/register")}
          >
            Create account
          </button>
        </div>

        {/* Bild-sidan */}
        <div className="hero-image">
          <img src="/dog.jpg" alt="Cute dog" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
