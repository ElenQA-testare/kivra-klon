import React from "react";
import FileUpload from "../components/FileUpload";

function UploadsPage() {
  return (
    <div className="uploads-page" style={{ padding: "2rem" }}>
      <h1>Uploads</h1>
      <FileUpload onUploadSuccess={() => {}} /> {/* Uppladdning utan lista */}
    </div>
  );
}

export default UploadsPage;
