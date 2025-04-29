import React from "react";
import "../styles/HomeDashboard.css";

function HomeDashboard({ setActivePage, documents }) {
  const unreadDocs = documents || [];

  return (
    <div className="home-dashboard">
      <h2 className="page-title">Home</h2>

      <div className="columns">
        {/* All Senders Box */}
        <div
          className="column"
          onClick={() => setActivePage("senders")}
        >
          <h3> All Senders</h3>
          <p>Visa alla avsändare</p>
          <ul className="doc-preview">
            {unreadDocs.map((doc, index) => (
              <li key={index}>{doc.originalname}</li>
            ))}
          </ul>
        </div>

        {/* Unread Letters Box */}
        <div
          className="column"
          onClick={() => setActivePage("unread")}
        >
          <h3> Unread Letters</h3>
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
