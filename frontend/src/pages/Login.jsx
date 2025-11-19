import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);

      const meResponse = await fetch("http://127.0.0.1:8000/api/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          Accept: "application/json",
        },
      });

      const user = await meResponse.json();

      if (user.role === "admin") {
        navigate("/add-speaker");
      } else {
        navigate("/list-speaker");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Login Admin / User
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "14px",
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px",
              fontSize: "14px",
            }}
            required
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4a90e2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#357ABD")}
            onMouseOut={(e) => (e.target.style.background = "#4a90e2")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
