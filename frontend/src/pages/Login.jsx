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

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6b73ff 100%)",
      }}
    >
      <div
        className="card shadow-lg rounded-4"
        style={{
          width: "360px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-semibold">Login</h3>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary py-2 fw-semibold rounded-3"
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-success py-2 fw-semibold rounded-3"
                onClick={() => navigate("/register")}
              >
                Register User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
