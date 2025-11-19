import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { imgUrl } from '../api';

export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get('/speakers').then(res => setSpeakers(res.data));
  }, []);

  const hapus = async (id) => {
    if (!confirm('Hapus data ini?')) return;
    await api.delete(`/speakers/${id}`);
    setSpeakers(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        🎧 Daftar Box Speaker
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {speakers.map((s, index) => (
          <motion.div
            key={s.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {s.gambar && (
              <img
                src={imgUrl(s.gambar)}
                alt={s.nama}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{s.nama}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <b>Ukuran:</b> {s.ukuran}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <b>Harga:</b>{' '}
                  <span className="text-green-600 font-bold">
                    Rp {s.harga.toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={`/detail/${s.id}`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Detail
                </Link>

                {token && (
                  <>
                    <Link
                      to={`/edit/${s.id}`}
                      className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapus(s.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {speakers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Belum ada data speaker 📦
        </p>
      )}
    </div>
  );
}
