import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddSpeaker() {
  const [form, setForm] = useState({ nama: '', ukuran: '', bahan: '', harga: '', deskripsi: '' });
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const nav = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
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
  );
}
