import React, { useEffect, useState } from "react";
import { FiTrash2, FiUserCheck, FiUserX, FiUsers } from "react-icons/fi";
import api from "../api";
import AdminLayout from "../layout/AdminLayout";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    api
      .get("show-users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Gagal memuat data user");
        setLoading(false);
      });
  };

  const deleteUser = (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    api
      .delete(`show-users/${id}`)
      .then(() => loadUsers())
      .catch(() => alert("Gagal menghapus user"));
  };

  const setRole = (id, role) => {
    api
      .put(`show-users/${id}/role`, { role })
      .then(() => loadUsers())
      .catch(() => alert("Gagal mengubah role"));
  };

  return (
    <AdminLayout>
      <>
        <style>{`
          .admin-wrapper {
            padding: 28px;
            background: #f1f5f9;
            min-height: 100vh;
          }

          .admin-header {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 22px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .admin-card {
            background: white;
            border-radius: 16px;
            padding: 22px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          thead th {
            background: #f8fafc;
            padding: 14px;
            font-size: 14px;
            font-weight: 700;
            color: #475569;
            border-bottom: 2px solid #e2e8f0;
          }

          tbody td {
            padding: 14px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 15px;
            color: #334155;
          }

          tbody tr:hover {
            background: #f1f5f9;
          }

          .role-badge {
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            color: white;
          }

          .admin {
            background: linear-gradient(135deg, #22c55e, #16a34a);
          }

          .user {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
          }

          /* ACTION ICONS */
          .actions {
            display: flex;
            gap: 14px;
            justify-content: center;
          }

          .icon-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            transition: all 0.25s ease;
          }

          .icon-btn:hover {
            transform: scale(1.12);
          }

          .make-admin {
            background: #e0f2fe;
            color: #0369a1;
          }

          .make-user {
            background: #ede9fe;
            color: #6d28d9;
          }

          .delete {
            background: #fee2e2;
            color: #b91c1c;
          }

          .icon-btn:hover.make-admin {
            box-shadow: 0 8px 18px rgba(2,132,199,0.35);
          }

          .icon-btn:hover.make-user {
            box-shadow: 0 8px 18px rgba(109,40,217,0.35);
          }

          .icon-btn:hover.delete {
            box-shadow: 0 8px 18px rgba(185,28,28,0.35);
          }

          /* TOOLTIP */
          .icon-btn span {
            position: absolute;
            bottom: -34px;
            background: #0f172a;
            color: white;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 6px;
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transition: 0.2s;
          }

          .icon-btn:hover span {
            opacity: 1;
          }

          /* LOADING */
          .loader {
            width: 44px;
            height: 44px;
            border: 5px solid #e2e8f0;
            border-top-color: #2563eb;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 40px auto;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        <div className="admin-wrapper">
          <div className="admin-header">
            <FiUsers size={26} />
            Manajemen Pengguna
          </div>

          <div className="admin-card">
            {loading ? (
              <div className="loader" />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ textAlign: "center" }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`role-badge ${
                            u.role === "admin" ? "admin" : "user"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          {u.role === "user" ? (
                            <div
                              className="icon-btn make-admin"
                              onClick={() => setRole(u.id, "admin")}
                            >
                              <FiUserCheck />
                              <span>Jadikan Admin</span>
                            </div>
                          ) : (
                            <div
                              className="icon-btn make-user"
                              onClick={() => setRole(u.id, "user")}
                            >
                              <FiUserX />
                              <span>Jadikan User</span>
                            </div>
                          )}

                          <div
                            className="icon-btn delete"
                            onClick={() => deleteUser(u.id)}
                          >
                            <FiTrash2 />
                            <span>Hapus User</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    </AdminLayout>
  );
}
