import React, { useEffect, useState } from "react";
import api from "../services/api";

function InboxDashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error("Kunde inte hämta dokument:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>📥 Dina dokument</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            📄 {doc.originalname} –{" "}
            <a href={`http://localhost:5000/${doc.path}`} target="_blank" rel="noreferrer">
              Öppna
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InboxDashboard;
