import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "./DashboardPage.css";

import HomeDashboard from "./HomeDashboard";
import UploadsPage from "./UploadsPage";
import SettingsPage from "./SettingsPage";
import InboxDashboard from "./InboxDashboard";
import AllSendersDashboard from "./AllSendersDashboard";
import UnreadLettersDashboard from "./UnreadLettersDashboardPage";

function DashboardPage() {
  const [tokenValid, setTokenValid] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setTokenValid(true);
      fetchDocuments(token);
    }
  }, []);

  const fetchDocuments = async (token) => {
    try {
      const response = await api.get("/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(response.data);
      console.log("📄 Hämtade dokument:", response.data);
    } catch (err) {
      console.error("❌ Kunde inte hämta dokument:", err);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomeDashboard setActivePage={setActivePage} documents={documents} />;

        case "uploads":
          return <UploadsPage documents={documents} refreshDocuments={() => fetchDocuments(localStorage.getItem("token"))} />;
        
      case "settings":
        return <SettingsPage />;
      case "inbox":
        return <InboxDashboard documents={documents} />;
        case "senders":
          return <AllSendersDashboard documents={documents} />;
        
        case "unread":
          return <UnreadLettersDashboard documents={documents} />;
        
      default:
        return <HomeDashboard setActivePage={setActivePage} />;
    }
  };

  return tokenValid ? (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>KIVRA</h2>
        <ul>
          <li onClick={() => setActivePage("home")}>🏠 Home</li>
          <li onClick={() => setActivePage("inbox")}>📥 Inbox</li>
          <li onClick={() => setActivePage("uploads")}>📤 Uploads</li>
          <li onClick={() => setActivePage("settings")}>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">{renderContent()}</main>
    </div>
  ) : null;
}

export default DashboardPage;
