import React from "react";
import "../styles/SettingsPage.css";

function SettingsPage() {
  return (
    <div className="settings-page">
      {/* 🔑 Ändra lösenord */}
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
