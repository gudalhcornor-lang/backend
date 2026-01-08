import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import AdminLayout from "../layout/AdminLayout";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ListSpeakerAdmin() {
  const [speakers, setSpeakers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login sebagai admin terlebih dahulu.");
      navigate("/");
      return;
    }

    api.get("/speakers").then((res) => setSpeakers(res.data));
  }, []);

  const hapus = async (id) => {
    const ok = window.confirm("Yakin ingin menghapus data ini?");
    if (!ok) return;

    await api.delete(`/speakers/${id}`);
    setSpeakers(speakers.filter((x) => x.id !== id));
  };

  const filteredSpeakers = speakers.filter(
    (s) =>
      s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <>
        {/* ======================== STYLE ======================== */}
        <style>{`
          .page {
            padding: 30px;
            background: #f4f6f9;
            min-height: 100vh;
          }

          .card-custom {
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            border: none;
          }

          .img-thumb {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
          }

          .badge-price {
            background: #e0f2fe;
            color: #0369a1;
            font-weight: 600;
          }

          /* ===== AKSI ICON ===== */
          .action-group {
            display: flex;
            justify-content: center;
            gap: 14px;
          }

          .action-icon {
            position: relative;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .action-icon.edit {
            background: #e0e7ff;
            color: #1d4ed8;
          }

          .action-icon.delete {
            background: #fee2e2;
            color: #b91c1c;
          }

          .action-icon:hover {
            transform: translateY(-2px);
          }

          .action-icon span {
            position: absolute;
            bottom: -28px;
            background: #020617;
            color: white;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 6px;
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transition: all 0.25s ease;
          }

          .action-icon:hover span {
            opacity: 1;
            transform: translateY(2px);
          }
        `}</style>

        {/* ======================== BODY ======================== */}
        <div className="page">
          <div className="card card-custom">
            <div className="card-body">
              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Manajemen Produk Speaker</h4>

                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Cari speaker..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* TABLE */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Gambar</th>
                      <th>Nama</th>
                      <th>Ukuran</th>
                      <th>Harga</th>
                      <th>Deskripsi</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSpeakers.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          Data speaker tidak ditemukan
                        </td>
                      </tr>
                    ) : (
                      filteredSpeakers.map((s, i) => (
                        <tr key={s.id}>
                          <td>{i + 1}</td>

                          <td>
                            {s.gambar && (
                              <img
                                src={imgUrl(s.gambar)}
                                className="img-thumb"
                                alt={s.nama}
                              />
                            )}
                          </td>

                          <td className="fw-semibold">{s.nama}</td>
                          <td>{s.ukuran}</td>
                          <td>
                            <span className="badge badge-price">
                              Rp {s.harga.toLocaleString()}
                            </span>
                          </td>
                          <td style={{ maxWidth: "250px" }}>
                            <small className="text-muted">
                              {s.deskripsi}
                            </small>
                          </td>

                          {/* === AKSI ICON === */}
                          <td>
                            <div className="action-group">
                              <Link to={`/edit-speaker/${s.id}`}>
                                <div className="action-icon edit">
                                  <FiEdit size={18} />
                                  <span>Edit</span>
                                </div>
                              </Link>

                              <div
                                className="action-icon delete"
                                onClick={() => hapus(s.id)}
                              >
                                <FiTrash2 size={18} />
                                <span>Hapus</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </AdminLayout>
  );
}
