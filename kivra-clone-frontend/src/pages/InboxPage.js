import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/InboxPage.css";

function InboxDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    console.log("📄 Dokument i InboxDashboard:", documents);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/documents/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(response.data);
    } catch (err) {
      console.error("❌ Fel vid hämtning av dokument:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDocuments(); // Uppdatera listan
    } catch (err) {
      console.error("❌ Fel vid radering:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="inbox-dashboard">
      <h2>📥 Inbox – Uppladdade Dokument</h2>
      <button onClick={fetchDocuments} style={{ marginBottom: "1rem" }}>
        🔄 Uppdatera
      </button>

      {loading ? (
        <p>🔄 Laddar dokument...</p>
      ) : documents.length === 0 ? (
        <p>🚫 Inga dokument uppladdade ännu.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id} style={{ marginBottom: "2rem" }}>
              <h4>{doc.filename}</h4>
              <iframe
                src={`http://localhost:5000/uploads/${doc.filename}`}
                width="100%"
                height="500px"
                title={doc.filename}
              ></iframe>
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  href={`http://localhost:5000/uploads/${doc.filename}`}
                  target="_blank"
                  rel="noreferrer"
                  className="download-link"
                >
                  📥 Ladda ner
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Radera
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InboxDashboard;
