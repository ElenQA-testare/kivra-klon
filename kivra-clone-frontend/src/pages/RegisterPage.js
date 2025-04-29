import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("✅ Konto skapat!");
      navigate("/login");
    } catch (error) {
      toast.error("❌ Fel: " + (error.response?.data?.error || "Registrering misslyckades"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <h2>Skapa konto</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Registrerar..." : "Registrera"}
          </button>
        </form>
        <p>Har du redan ett konto? <Link to="/login">Logga in här</Link></p>
      </div>

      <div
        className="register-right"
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

export default RegisterPage;
