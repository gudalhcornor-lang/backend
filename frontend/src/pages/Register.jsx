import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal");
        return;
      }

      alert("Registrasi berhasil! Silakan login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi.");
    }
  };

  // === STYLE ===
  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    padding: "20px",
  };

  const cardStyle = {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    fontSize: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "5px",
    transition: "0.3s",
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4e54c8",
    marginTop: "12px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Register User
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            style={inputStyle}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit" style={buttonStyle}>
            Daftar
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          style={loginButtonStyle}
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}
