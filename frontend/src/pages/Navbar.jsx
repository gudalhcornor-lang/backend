import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiHeart, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        /* ===== NAVBAR ===== */
        .navbar {
          height: 70px;
          background: rgba(15,23,42,.88);
          backdrop-filter: blur(12px);

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 32px;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;

          width: 100%;
          z-index: 100;
          box-shadow: 0 10px 30px rgba(0,0,0,.3);
        }

        .brand {
          font-size: 20px;
          font-weight: 900;
          color: white;
          letter-spacing: 1px;
        }

        /* ===== MENU CONTAINER ===== */
        .menu {
          display: flex;
          align-items: center;
          gap: 8px; /* 🔴 KONTROL JARAK DI SINI */
        }

        /* ===== ICON BUTTON ===== */
        .nav-link {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;
          text-decoration: none;

          color: #cbd5f5;
          transition: .25s ease;
        }

        .nav-link:hover {
          background: rgba(255,255,255,.08);
          transform: translateY(-1px);
        }

        .nav-link.active {
          background: linear-gradient(135deg,#3b82f6,#2563eb);
          color: white;
          box-shadow: 0 6px 16px rgba(37,99,235,.45);
        }

        /* ===== WISHLIST (MERAH) ===== */
        .nav-link.wishlist {
          color: #fca5a5;
        }

        .nav-link.wishlist:hover {
          background: rgba(220,38,38,.15);
          color: #fecaca;
        }

        .nav-link.wishlist.active {
          background: linear-gradient(135deg,#dc2626,#b91c1c);
          color: white;
          box-shadow: 0 6px 16px rgba(220,38,38,.55);
        }

        /* ===== LOGOUT ===== */
        .logout {
          margin-left: 6px;

          height: 42px;
          padding: 0 16px;

          display: flex;
          align-items: center;
          gap: 8px;

          border-radius: 999px;
          text-decoration: none;

          font-size: 14px;
          font-weight: 800;
          color: white;

          background: linear-gradient(135deg,#dc2626,#b91c1c);
          box-shadow: 0 8px 22px rgba(220,38,38,.55);
          transition: .25s;
        }

        .logout:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(220,38,38,.7);
        }
      `}</style>

      <nav className="navbar">
        {/* BRAND */}
        <div className="brand">CSS AUDIO PRODUCTIONS</div>

        {/* MENU */}
        <div className="menu">
          <Link
            to="/list-speaker"
            className={`nav-link ${isActive("/list-speaker") ? "active" : ""}`}
          >
            <FiHome size={20} />
          </Link>

          <Link
            to="/wishlist"
            className={`nav-link wishlist ${
              isActive("/wishlist") ? "active" : ""
            }`}
          >
            <FiHeart size={20} />
          </Link>

          <Link to="/" className="logout">
            <FiLogOut size={16} />
            
          </Link>
        </div>
      </nav>
    </>
  );
}
