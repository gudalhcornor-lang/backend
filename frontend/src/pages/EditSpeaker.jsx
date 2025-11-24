import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import AdminLayout from "../layout/AdminLayout";

export default function EditSpeaker() {
  const { id } = useParams();
  const [form, setForm] = useState({
    nama: "",
    ukuran: "",
    bahan: "",
    harga: "",
    deskripsi: "",
    gambar: "",
  });

  const [preview, setPreview] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/speakers/${id}`).then((res) => {
      setForm(res.data);
      setPreview(imgUrl(res.data.gambar));
    });
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
    setForm({ ...form, gambarBaru: file });
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nama", form.nama);
    data.append("ukuran", form.ukuran);
    data.append("bahan", form.bahan);
    data.append("harga", form.harga);
    data.append("deskripsi", form.deskripsi);

    if (form.gambarBaru) data.append("gambar", form.gambarBaru);

    await api.post(`/speakers/${id}?_method=PUT`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Produk berhasil di-update!");
    nav("/list-speakeradmin");
  };

  return (
    <AdminLayout>
      <>
        {/* =================== CSS PREMIUM ================== */}
        <style>{`
        .edit-page {
          min-height: 100vh;
          background: #f5f7fa;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:50px 20px;
        }
        .form-card {
          background:white;
          width:100%;
          max-width:650px;
          padding:40px;
          border-radius:24px;
          border:1px solid #e2e8f0;
          box-shadow:0 16px 32px rgba(0,0,0,.08);
        }
        .title {
          font-size:32px;
          font-weight:700;
          text-align:center;
          margin-bottom:30px;
          color:#2d3748;
        }
        .form-body {
          display:flex;
          flex-direction:column;
          gap:22px;
        }
        .form-row {
          display:flex;
          flex-direction:column;
          gap:20px;
        }
        @media (min-width:600px){
          .form-row { flex-direction:row; }
        }
        .form-group {
          flex:1;
          display:flex;
          flex-direction:column;
          gap:8px;
        }
        .form-group label {
          font-weight:600;
          color:#4a5568;
        }
        .form-group input,
        .form-group textarea {
          padding:12px 16px;
          border:1px solid #cbd5e0;
          border-radius:12px;
          background:#f7fafc;
          font-size:16px;
          transition:.2s;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          border-color:#3182ce;
          box-shadow:0 0 0 4px rgba(49,130,206,.3);
        }
        .image-preview img {
          width:200px;
          height:200px;
          object-fit:cover;
          border-radius:16px;
          border:1px solid #e2e8f0;
          box-shadow:0 8px 18px rgba(0,0,0,.1);
          margin-top:10px;
        }

        /* BUTTON UPDATE */
        .btn-save {
          background:#3182ce;
          padding:14px 20px;
          color:white;
          border:none;
          border-radius:12px;
          font-size:17px;
          font-weight:600;
          cursor:pointer;
          transition:.2s;
        }
        .btn-save:hover {
          background:#2c5282;
          transform:translateY(-2px);
        }

        /* BUTTON BATAL */
        .btn-cancel {
          background:#cbd5e1;
          padding:14px 20px;
          color:#1e293b;
          border:none;
          border-radius:12px;
          font-size:17px;
          font-weight:600;
          cursor:pointer;
          transition:.2s;
        }
        .btn-cancel:hover {
          background:#94a3b8;
          transform:translateY(-2px);
        }

        .btn-row {
          display:flex;
          gap:12px;
          margin-top:10px;
          justify-content:flex-end;
        }
      `}</style>

        {/* =================== BODY ================== */}
        <div className="edit-page">
          <div className="form-card">
            <h1 className="title">Edit Box Speaker</h1>

            <form onSubmit={submit} className="form-body">

              <div className="form-row">
                <div className="form-group">
                  <label>Nama</label>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({ ...form, nama: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ukuran</label>
                  <input
                    type="text"
                    value={form.ukuran}
                    onChange={(e) =>
                      setForm({ ...form, ukuran: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Bahan</label>
                <input
                  type="text"
                  value={form.bahan}
                  onChange={(e) =>
                    setForm({ ...form, bahan: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Harga</label>
                <input
                  type="number"
                  value={form.harga}
                  onChange={(e) =>
                    setForm({ ...form, harga: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  rows="4"
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Gambar</label>
                <input type="file" onChange={handleImage} />

                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="preview" />
                  </div>
                )}
              </div>

              {/* BUTTON ROW */}
              <div className="btn-row">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => nav("/list-speakeradmin")}
                >
                  Batal
                </button>

                <button type="submit" className="btn-save">
                  Update Produk
                </button>
              </div>

            </form>
          </div>
        </div>
      </>
    </AdminLayout>
  );
}
