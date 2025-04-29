import React, { useState } from "react";
import "../styles/SettingsPage.css";

function SettingsPage() {
  const [language, setLanguage] = useState("en"); // standard är engelska

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Spara i localStorage om du vill komma ihåg valet
    localStorage.setItem("language", e.target.value);
  };

  return (
    <div className="settings-page">
      {/* Språk */}
      <div className="settings-section">
        <label htmlFor="language">🌍 Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="sv">Svenska</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Ändra lösenord */}
      <div className="settings-section">
        <label>🔑 Change Password:</label>
        <input type="password" placeholder="Old password" />
        <input type="password" placeholder="New password" />
        <input type="password" placeholder="Confirm new password" />
      </div>

      <div className="settings-section">
        <button className="save-btn">💾 Save Settings</button>
      </div>
    </div>
  );
}

export default SettingsPage;
