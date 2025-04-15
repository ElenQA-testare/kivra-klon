import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Fil uppladdad!");
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      toast.error("❌ Fel vid uppladdning");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2>Ladda upp dokument</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Ladda upp</button>
    </div>
  );
}

export default FileUpload;
