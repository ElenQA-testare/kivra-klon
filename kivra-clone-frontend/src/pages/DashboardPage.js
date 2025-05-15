import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./DashboardPage.css";

function DashboardPage() {
  const [tokenValid, setTokenValid] = useState(false);
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
  }, [navigate]); // ✅ navigate tillagd här

  const fetchDocuments = async (token) => {
    try {
      const res = await api.get("/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("❌ Kunde inte hämta dokument:", err);
    }
  };

  const handleNav = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return tokenValid ? (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>KIVRA</h2>
        <ul>
          <li onClick={() => handleNav("")}>🏠 Home</li>
          <li onClick={() => handleNav("inbox")}>📥 Inbox</li>
          <li onClick={() => handleNav("uploads")}>📤 Uploads</li>
          <li onClick={() => handleNav("settings")}>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <Outlet
          context={{
            documents,
            refreshDocuments: () =>
              fetchDocuments(localStorage.getItem("token")),
          }}
        />
      </main>
    </div>
  ) : null;
}

export default DashboardPage;
