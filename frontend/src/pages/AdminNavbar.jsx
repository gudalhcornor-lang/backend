import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiPlus, FiPower, FiUser } from "react-icons/fi";

export default function AdminNavbar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItem = (path, label, Icon) => (
    <Link
      to={path}
      onClick={(e) => e.stopPropagation()}
      className={`menu-item ${location.pathname === path ? "active" : ""}`}
    >
      <Icon className="icon" />
      {open && <span className="text">{label}</span>}
    </Link>
  );

  const logout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: ${open ? "240px" : "72px"};
          background: linear-gradient(180deg, #020617, #1e293b);
          color: white;
          transition: width 0.3s ease;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          cursor: pointer;
        }

        .sidebar.open {}

        .sidebar-header {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          letter-spacing: 0.5px;
          user-select: none;
        }

        .menu {
          flex: 1;
          padding: 12px 10px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 48px;
          padding: 0 14px;
          margin-bottom: 8px;
          border-radius: 12px;
          color: #cbd5f5;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.12);
          color: white;
        }

        .menu-item.active {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 6px 16px rgba(37,99,235,0.45);
        }

        .icon {
          font-size: 20px;
          min-width: 24px;
        }

        .text {
          white-space: nowrap;
        }

        /* ===== FOOTER ===== */
        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .logout-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: white;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }

        .logout-btn:hover {
          box-shadow: 0 8px 20px rgba(220,38,38,0.45);
        }

        .logout-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 100%;
          width: 100%;
          padding: 0 14px;
          justify-content: center;
        }

        .sidebar.open .logout-inner {
          justify-content: flex-start;
        }
      `}</style>

      <aside
        className={`sidebar ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="sidebar-header">
          {open ? "CSS AUDIO PRODUCTIONS" : "CSS"}
        </div>

        <div className="menu">
          {menuItem("/list-speakeradmin", "Home", FiHome)}
          {menuItem("/add-speaker", "Tambah Produk", FiPlus)}
          {menuItem("/show-users","Show Users",FiUser)}
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <div className="logout-inner">
              <FiPower />
              {open && <span>Logout</span>}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
