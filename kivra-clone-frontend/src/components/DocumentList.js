import React from "react";

function DocumentList({ documents }) {
  if (!documents || documents.length === 0) {
    return <p>🚫 Inga dokument uppladdade.</p>;
  }

  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc._id}>
          <a href={`http://localhost:5000/uploads/${doc.filename}`} download>
            📄 {doc.originalname}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default DocumentList;
