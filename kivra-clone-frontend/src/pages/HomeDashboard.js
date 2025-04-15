// src/pages/HomeDashboard.js
import React from "react";
import "../styles/HomeDashboard.css";

function HomeDashboard() {
  return (
    <div className="home-dashboard">
      <h1>Home</h1>

      <div className="summary-boxes">
        <div className="box">
          <span>📧</span>
          <p>75 unread letters</p>
        </div>
        <div className="box">
          <span>👜</span>
          <p>2 unhandled<br /><strong>SEK 626.00</strong></p>
          <button className="pay-btn">Pay several</button>
        </div>
      </div>

      <section className="senders-section">
        <h2>Senders</h2>
        <div className="senders-grid">
          {[
            "Fora", "Kommunal", "Skatteverket", "Försäkringskassan", "Hedda Care", "KPA Pension"
          ].map((name, i) => (
            <div key={i} className="sender-card">
              <div className="logo-placeholder">{name[0]}</div>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeDashboard;
