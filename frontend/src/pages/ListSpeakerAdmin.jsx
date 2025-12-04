import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import AdminLayout from "../layout/AdminLayout";

export default function ListSpeakerAdmin() {
  const [speakers, setSpeakers] = useState([]);
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

    await api.delete(`/speakers/${id}`);
    setSpeakers(speakers.filter((x) => x.id !== id));
  };

  return (
    <AdminLayout>
      <>
        {/* ======================== CSS ======================== */}
        <style>{`
          .page {
            padding: 40px;
            background: #f5f7fa;
            min-height: 100vh;
          }

          .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          }

          .title {
            font-size: 30px;
            font-weight: 700;
            color: #2d3748;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          thead {
            background: #e2e8f0;
          }

          th, td {
            padding: 14px 18px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 15px;
            text-align: left;
          }

          th {
            font-weight: 700;
            color: #2d3748;
          }

          tbody tr:hover {
            background: #f7fafc;
          }

          .img-thumb {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #ddd;
          }

          /* ==== BUTTON STYLE ==== */
          .btn-action {
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: 0.2s;
            margin-right: 8px;
          }

          .btn-edit {
            background: #3182ce;
            color: white;
          }
          .btn-edit:hover {
            background: #2563eb;
          }

          .btn-delete {
            background: #e53e3e;
            color: white;
          }
          .btn-delete:hover {
            background: #c53030;
          }
        `}</style>

        {/* ======================== BODY ======================== */}
        <div className="page">
          <div className="top-bar">
            <div className="title">Produk Box Speaker</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Ukuran</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {speakers.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>

                  <td>
                    {s.gambar && (
                      <img src={imgUrl(s.gambar)} className="img-thumb" />
                    )}
                  </td>

                  <td>{s.nama}</td>
                  <td>{s.ukuran}</td>
                  <td>Rp {s.harga.toLocaleString()}</td>
                   <td>{s.deskripsi}</td>
                  <td>
                    <Link to={`/edit-speaker/${s.id}`}>
                      <button className="btn-action btn-edit">Edit</button>
                    </Link>

                    <button
                      className="btn-action btn-delete"
                      onClick={() => hapus(s.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </AdminLayout>
  );
}
