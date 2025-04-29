// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("✅ Inloggning lyckades!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ Fel: " + (error.response?.data?.error || "Inloggning misslyckades"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2>Logga in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
        <p>Har du inget konto? <Link to="/register">Skapa konto här</Link></p>
      </div>

      <div
        className="login-right"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0 30px 30px 0",
        }}
      ></div>
    </div>
  );
}

export default LoginPage;
