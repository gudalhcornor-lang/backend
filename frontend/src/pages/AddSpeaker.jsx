import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "../layout/AdminLayout";

export default function AddSpeaker() {
  const [form, setForm] = useState({
    nama: '',
    ukuran: '',
    bahan: '',
    harga: '',
    deskripsi: '',
  });
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const nav = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (gambar) data.append('gambar', gambar);

    try {
      await api.post('/speakers', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      nav('/list-speakeradmin');

    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan speaker.');
    }
  };

  return (
    <AdminLayout>
      <>
        <style>{`
          .add-speaker-page {
            min-height: 100vh;
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
          }
          .form-card {
            background-color: #ffffff;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
            max-width: 600px;
            width: 100%;
          }
          .form-title {
            text-align: center;
            font-size: 32px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 32px;
          }
          .form-body {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .form-row {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          @media (min-width: 600px) {
            .form-row {
              flex-direction: row;
            }
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
          }
          .form-group label {
            font-weight: 500;
            color: #4a5568;
          }
          .form-group input[type="text"],
          .form-group input[type="number"],
          .form-group textarea {
            padding: 12px 16px;
            border: 1px solid #cbd5e0;
            border-radius: 12px;
            font-size: 16px;
            color: #2d3748;
            background-color: #f7fafc;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .form-group input:focus,
          .form-group textarea:focus {
            border-color: #3182ce;
            box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.25);
            outline: none;
          }

          /* STYLE SELECT */
          .select-input {
            padding: 12px 16px;
            border: 1px solid #cbd5e0;
            border-radius: 12px;
            font-size: 16px;
            color: #2d3748;
            background-color: #f7fafc;
            transition: border 0.2s, box-shadow 0.2s;
          }

          .select-input:focus {
            border-color: #3182ce;
            box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.25);
            outline: none;
          }

          .image-preview img {
            max-width: 200px;
            max-height: 200px;
            border-radius: 16px;
            object-fit: cover;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }

          .btn-save {
            background-color: #3182ce;
            color: white;
            font-size: 17px;
            font-weight: 600;
            padding: 14px 20px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: 0.2s;
          }
          .btn-save:hover {
            background-color: #2c5282;
            transform: translateY(-2px);
          }

          .btn-cancel {
            background-color: #cbd5e1;
            color: #1e293b;
            font-size: 17px;
            font-weight: 600;
            padding: 14px 20px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: 0.2s;
          }
          .btn-cancel:hover {
            background-color: #94a3b8;
            transform: translateY(-2px);
          }

          .btn-row {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 10px;
          }

        `}</style>

        <div className="add-speaker-page">
          <div className="form-card">
            <h1 className="form-title">Tambah Box Speaker</h1>

            <form onSubmit={submit} className="form-body">

              <div className="form-row">
                <div className="form-group">
                  <label>Nama</label>
                  <input
                    type="text"
                    placeholder="Nama Speaker"
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ukuran</label>
                  <select
                    className="select-input"
                    onChange={(e) => setForm({ ...form, ukuran: e.target.value })}
                    required
                  >
                    <option value="">-- Pilih Ukuran --</option>
                    <option value="10 inch">10 inch</option>
                    <option value="12 inch">12 inch</option>
                    <option value="15 inch">15 inch</option>
                    <option value="18 inch">18 inch</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Bahan</label>
                <input
                  type="text"
                  placeholder="Bahan"
                  onChange={(e) => setForm({ ...form, bahan: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Harga</label>
                <input
                  type="number"
                  placeholder="Harga"
                  onChange={(e) => setForm({ ...form, harga: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  placeholder="Deskripsi produk"
                  rows="4"
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Gambar</label>
                <input type="file" onChange={handleFileChange} />
                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="btn-row">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => nav("/list-speakeradmin")}
                >
                  Batal
                </button>

                <button type="submit" className="btn-save">
                  Simpan
                </button>
              </div>

            </form>
          </div>
        </div>
      </>
    </AdminLayout>
  );
}
