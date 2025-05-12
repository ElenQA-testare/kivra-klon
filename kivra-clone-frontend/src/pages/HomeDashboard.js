import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/HomeDashboard.css";

function HomeDashboard() {
  const [unreadDocs, setUnreadDocs] = useState([]);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/documents/unread", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadDocs(res.data);
      } catch (error) {
        console.error("❌ Kunde inte hämta olästa dokument:", error);
      }
    };

    fetchUnread();
  }, []);

  return (
    <div className="home-dashboard">
      <h2 className="page-title">Home</h2>

      <div className="columns">
        {/* All Senders Box */}
        <div
          className="column"
          onClick={() => (window.location.href = "/dashboard/senders")}
        >
          <h3>All Senders</h3>
          <p>Visa alla avsändare</p>
        </div>

        {/* Unread Letters Box */}
        <div
          className="column"
          onClick={() => (window.location.href = "/dashboard/unread")}
        >
          <h3>Unread Letters</h3>
          <p>Du har {unreadDocs.length} olästa brev</p>
          <ul className="doc-preview">
            {unreadDocs.map((doc, index) => (
              <li key={index}>
                <a
                  href={`http://localhost:5000/${doc.path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {doc.originalname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
