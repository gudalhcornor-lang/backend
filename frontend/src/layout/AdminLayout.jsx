import React, { useState } from "react";
import AdminNavbar from "../pages/AdminNavbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar open={open} setOpen={setOpen} />

      {/* CONTENT */}
      <div
        onClick={() => setOpen(false)} // klik area konten → sidebar hide
        style={{
          marginLeft: open ? "240px" : "72px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          background: "#f1f5f9",
        }}
      >
        {children}
      </div>
    </div>
  );
}
