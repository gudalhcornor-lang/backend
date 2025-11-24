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
        navigate("/list-speakeradmin");
      } else {
        navigate("/list-speaker");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi.");
    }
  };

  // --- STYLE ---
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    margin: 0,
    padding: 0,
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
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#4e54c8",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "5px",
    transition: "0.3s",
  };

  const registerButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    marginTop: "12px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/register")}
          style={registerButtonStyle}
        >
          Register User
        </button>
      </div>
    </div>
  );
}

export default Login;
