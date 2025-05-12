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
    <div style={{ padding: "2rem" }}>
      <h2>📥 Inbox</h2>
      {documents.length === 0 ? (
        <p>Inga dokument hittades.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id} data-testid={`doc-item-${doc._id}`}>
              📄 {doc.originalname} –{" "}
              <a
                href={`http://localhost:5000/${doc.path}`}
                target="_blank"
                rel="noreferrer"
              >
                Öppna
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InboxDashboard;
