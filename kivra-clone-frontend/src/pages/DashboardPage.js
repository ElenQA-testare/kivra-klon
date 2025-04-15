// src/pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import axios from "axios";
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
  }, []);

  const fetchDocuments = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
    } catch (error) {
      console.error("❌ Kunde inte hämta dokument:", error);
    }
  };

  return tokenValid ? (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>KIVRA</h2>
        <ul>
          <li>🏠 Home</li>
          <li>📤 Uploads</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="profile">
            <span className="initials">EA</span>
            <span className="username">Elen Berhane Alem</span>
          </div>
        </header>

        <section className="dashboard-content">
          <h1>Welcome to your Dashboard</h1>
          <FileUpload onUploadSuccess={() => fetchDocuments(localStorage.getItem("token"))} />

          <h3>Your Documents:</h3>
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>
                📄 {doc.originalname} –{" "}
                <a href={`http://localhost:5000/${doc.filename}`} target="_blank" rel="noreferrer">
                  Open
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  ) : null;
}

export default DashboardPage;
