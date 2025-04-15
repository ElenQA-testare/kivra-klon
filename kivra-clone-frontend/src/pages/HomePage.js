import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css"; // Kopplar till CSS
import dogImage from "./../assets/dog.png"; // Lägg bilden i src/assets

function HomePage() {
  return (
    <div className="home">
      {/* Hero-sektion */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>For all the collectors out there</h1>
          <p>
            A paper here, a receipt there. Can you relate? We have a better idea.
            Imagine letters, bills, receipts, uploads, and other important things – all in one app.
            Completely free, of course. Smart, secure, and sweet for the environment!
          </p>
          <Link to="/register" className="signup-btn">
            <span className="bankid-icon">📲</span> Create account
          </Link>
        </div>
        <div className="hero-image">
          <img src={dogImage} alt="Dog with tennis balls" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
