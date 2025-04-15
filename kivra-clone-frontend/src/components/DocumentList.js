// src/components/DocumentList.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./DocumentList.css";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/uploads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data);
      } catch (err) {
        setError("❌ Failed to load documents");
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="document-list">
      <h3>📄 Uploaded Documents</h3>
      {error && <p>{error}</p>}
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <a href={`http://localhost:5000/uploads/${doc.filename}`} download>
                {doc.originalname}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentList;
