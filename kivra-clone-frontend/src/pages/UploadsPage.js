import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import api from "../services/api";

function UploadsPage() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("❌ Kunde inte hämta dokument:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="uploads-page" style={{ padding: "2rem" }}>
      <h1>Uploads</h1>
      <FileUpload onUploadSuccess={fetchDocuments} />

      
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

export default UploadsPage;
