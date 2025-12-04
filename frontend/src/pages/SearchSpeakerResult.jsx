
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

export default function SearchSpeakerResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil keyword dari URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/speakers/search?keyword=${keyword}`);
        setResults(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [keyword]);

  return (
    <MainLayout>
      <div className="p-6">

        <h1 className="text-3xl font-semibold mb-6">
          Hasil Pencarian: "{keyword}"
        </h1>

        {loading ? (
          <p className="text-gray-600">Memuat...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Tidak ada hasil yang ditemukan untuk kata kunci: <b>{keyword}</b>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="shadow-md border rounded-xl p-4 cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`/detail-speaker/${item.id}`)}
              >
                <img
                  src={imgUrl + item.gambar}
                  alt={item.nama}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="text-xl font-semibold mt-3">{item.nama}</h2>
                <p className="text-gray-600">{item.ukuran}</p>
                <p className="text-blue-700 font-bold mt-2">
                  Rp {parseInt(item.harga).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
