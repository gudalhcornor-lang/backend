import React from "react";
import Navbar from "../pages/Navbar";

export default function MainLayout({ children }) {
  return (
    <div 
      style={{ 
        width: "100%", 
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* --- NAVBAR FIXED DI ATAS --- */}
      <div 
        style={{ 
          width: "100%", 
          background: "white", 
          position: "fixed", 
          top: 0,
          left: 0,
          zIndex: 999,
          borderBottom: "1px solid #e2e8f0",
          height: "70px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Navbar />
      </div>

      {/* --- KONTEN HALAMAN --- */}
      <div 
        style={{ 
          width: "100%", 
          marginTop: "70px", 
          padding: "20px",
          flexGrow: 1 
        }}
      >
        {children}
      </div>

    </div>
  );
}
