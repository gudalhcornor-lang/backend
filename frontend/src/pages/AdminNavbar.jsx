import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const location = useLocation();

  const navBtn = (path, label) => (
    <Link
      to={path}
      style={{
        padding: "10px 18px",
        borderRadius: "6px",
        color: location.pathname === path ? "#fff" : "#e5e7eb",
        background: location.pathname === path ? "#2563eb" : "transparent",
        textDecoration: "none",
        fontSize: "15px",
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        width: "100vw",
        background: "#1f2937",
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>CSS AUDIO PRODUCTIONS</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {navBtn("/list-speakeradmin", "Home")}
        {navBtn("/add-speaker", "Tambah Produk")}
        {navBtn("/", "Logout")}
      </div>
    </nav>
  );
}
