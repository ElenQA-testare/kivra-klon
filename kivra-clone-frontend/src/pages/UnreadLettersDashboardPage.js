import React, { useEffect, useState } from "react";
import api from "../services/api";

function UnreadLettersDashboardPage() {
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
        console.error("Kunde inte hämta olästa dokument:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📨 Olästa Brev</h2>
      {documents.length === 0 ? (
        <p>Inga olästa brev hittades.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              {doc.originalname} –{" "}
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

export default UnreadLettersDashboardPage;