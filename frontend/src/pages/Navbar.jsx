import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "15px",
        color: location.pathname === path ? "#fff" : "#e5e7eb",
        background: location.pathname === path ? "#2563eb" : "transparent",
        transition: "0.2s",
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        width: "100%",
        background: "#1f2937",
        padding: "14px 28px",
        marginBottom: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo atau Nama Aplikasi */}
      <h2 style={{ color: "white", margin: 0 }}>CSS AUDIO PRODUCTIONS</h2>

      {/* Menu */}
      <div style={{ display: "flex", gap: "12px" }}>
        {navItem("/list-speaker", "Home")}
        {navItem("/wishlist", "Wishlist")}
      
      </div>
    </nav>
  );
}
