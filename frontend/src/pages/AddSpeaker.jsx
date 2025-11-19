import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddSpeaker() {
<<<<<<< HEAD
  const [form, setForm] = useState({
    nama: '',
    ukuran: '',
    bahan: '',
    harga: '',
    deskripsi: '',
  });
=======
  const [form, setForm] = useState({ nama: '', ukuran: '', bahan: '', harga: '', deskripsi: '' });
>>>>>>> 0198c2a1139c0142112f61a9fe977b47634f74a2
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const nav = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
<<<<<<< HEAD
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
=======
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
>>>>>>> 0198c2a1139c0142112f61a9fe977b47634f74a2
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
      nav('/');
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan speaker.');
    }
  };

  return (
<<<<<<< HEAD
    <>
      {/* ===================== CSS DALAM 1 FILE ===================== */}
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
        .form-group input[type="file"] {
          padding: 6px;
          font-size: 14px;
        }
        .image-preview {
          margin-top: 12px;
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
          font-size: 18px;
          font-weight: 500;
          padding: 14px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }
        .btn-save:hover {
          background-color: #2c5282;
          transform: translateY(-2px);
        }
        .btn-save:active {
          transform: translateY(0);
        }
      `}</style>

      {/* ===================== HTML FORM ===================== */}
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
                <input
                  type="text"
                  placeholder="Ukuran"
                  onChange={(e) => setForm({ ...form, ukuran: e.target.value })}
                  required
                />
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
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
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

            <button type="submit" className="btn-save">Simpan</button>
          </form>
        </div>
      </div>
    </>
=======
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Tambah Box Speaker</h2>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama"
              onChange={e => setForm({ ...form, nama: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ukuran</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ukuran"
              onChange={e => setForm({ ...form, ukuran: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bahan</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bahan"
              onChange={e => setForm({ ...form, bahan: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Harga</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Harga"
              onChange={e => setForm({ ...form, harga: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Deskripsi</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi"
              onChange={e => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gambar</label>
            <input type="file" className="w-full" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg border border-gray-300"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
>>>>>>> 0198c2a1139c0142112f61a9fe977b47634f74a2
  );
}
