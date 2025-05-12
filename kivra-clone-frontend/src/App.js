import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import HomeDashboard from "./pages/HomeDashboard";
import UploadsPage from "./pages/UploadsPage";
import InboxDashboard from "./pages/InboxDashboard";
import SettingsPage from "./pages/SettingsPage";
import AllSendersDashboard from "./pages/AllSendersDashboard";
import UnreadLettersDashboard from "./pages/UnreadLettersDashboardPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🌍 Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🧭 Dashboard Pages (nested routing) */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<HomeDashboard />} />
          <Route path="uploads" element={<UploadsPage />} />
          <Route path="inbox" element={<InboxDashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="senders" element={<AllSendersDashboard />} />
          <Route path="unread" element={<UnreadLettersDashboard />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
