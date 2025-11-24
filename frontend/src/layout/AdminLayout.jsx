import React from "react";
import AdminNavbar from "../pages/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <AdminNavbar />

      {/* Halaman Admin */}
      <div
        style={{
          width: "100vw",
          flexGrow: 1,
          margin: 0,
          padding: "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
