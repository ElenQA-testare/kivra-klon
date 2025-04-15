import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // 🔹 Lägg till denna rad
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
      toast.success("✅ Inloggning lyckades!"); // 🔹 Visa grön notis
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ Fel: " + (error.response?.data?.error || "Inloggning misslyckades")); // 🔹 Visa röd notis
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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
  );
}

export default LoginPage;
