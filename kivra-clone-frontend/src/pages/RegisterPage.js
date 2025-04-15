import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/RegisterPage.css";
import { toast } from "react-toastify";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setSuccess("Kontot skapades!");
      toast.success("Registrering lyckades!");
    } catch (error) {
      const msg = error.response?.data?.error || "Registrering misslyckades";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="register-container">
      <h2>Skapa konto</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Registrera</button>
      </form>

      <p>Har du redan ett konto? <Link to="/login">Logga in här</Link></p>
    </div>
  );
}

export default RegisterPage;
