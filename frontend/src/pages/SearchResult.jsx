import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const q = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const loadSearch = async () => {
      setLoading(true);

      try {
        const res = await api.post("/search", { keyword: q });
        const items = res.data.data || [];
        setResults(items);

        const temp = {};
        await Promise.all(
          items.map(async (p) => {
            try {
              const r = await api.get(`/rating/product/${p.id}`);
              temp[p.id] = r.data.average_rating ?? 0;
            } catch {
              temp[p.id] = 0;
            }
          })
        );

        setRatings(temp);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    if (q.trim() !== "") loadSearch();
  }, [q]);

  const normalize = (v) =>
    String(v || "").toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

  const filteredSorted = useMemo(() => {
    let list = [...results];

    list = list.map((p) => {
      const nameMatch = (p.nama || "").toLowerCase().includes(q.toLowerCase()) ? 2 : 0;
      const sizeMatch = normalize(p.ukuran).includes(normalize(q)) ? 1 : 0;

      return {
        ...p,
        _rating: ratings[p.id] ?? 0,
        _score: nameMatch + sizeMatch,
      };
    });

    if (sortBy === "score") {
      list.sort((a, b) => b._score - a._score || b._rating - a._rating);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b._rating - a._rating);
    } else if (sortBy === "price_low") {
      list.sort((a, b) => (a.harga || 0) - (b.harga || 0));
    } else if (sortBy === "price_high") {
      list.sort((a, b) => (b.harga || 0) - (a.harga || 0));
    }

    return list;
  }, [results, ratings, q, sortBy]);

  const top5 = useMemo(() => filteredSorted.slice(0, 5), [filteredSorted]);

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <span className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < full ? "star full" : "star empty"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <MainLayout>
      <style>{`
        :root { --muted:#94a3b8; --gold:#f6c84c }

        .detail-container {
          width: 100vw; min-height: 100vh; padding: 20px;
          background: #f8fafc;
        }

        .title { font-size: 24px; font-weight: 800; margin-bottom: 6px; }
        .sub { color: var(--muted); margin-bottom: 20px; }

        .search-form { width: 60%; min-width: 250px; margin-bottom: 20px; }

        .search-box {
          display: flex; gap: 10px; align-items: center;
          background: white; padding: 12px 14px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,.07);
        }

        .search-box input {
          border: none; outline: none; flex: 1;
          font-size: 15px; background: transparent;
        }

        .btn-search {
          background: #2563eb; color: white;
          padding: 8px 18px; border-radius: 10px;
          border: none; cursor: pointer;
        }

        .grid {
          display: grid; gap: 20px;
          grid-template-columns: repeat(4, 1fr);
        }

        @media(max-width:1100px){ .grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:600px){ .grid { grid-template-columns: 1fr; } }

        .card {
          background: white; padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,.05);
          box-shadow: 0 10px 30px rgba(0,0,0,.07);
          cursor: pointer; transition: .15s ease;
        }

        .card:hover { transform: translateY(-5px); }

        .card-media { height: 170px; overflow: hidden; border-radius: 10px; }
        .card-media img { width: 100%; height: 100%; object-fit: cover; }

        .stars .star { font-size: 14px; margin-right: 3px; }
        .stars .full { color: var(--gold); }
        .stars .empty { color: #e1e5eb; }

        /* Tombol kembali fixed */
.back-btn {
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: #e5e7eb;     /* abu-abu */
  color: #374151;          /* abu gelap */
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  z-index: 9999;
  transition: 0.2s ease;
}

.back-btn:hover {
  background: #d1d5db;     /* abu-abu lebih gelap */
}


        .skeleton {
          background: #e5e7eb; height: 20px;
          border-radius: 6px; margin-top: 8px;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: .6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Search box */}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-box">
          <span>🔎</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari ulang..."
          />
          <button className="btn-search" type="submit">Search</button>
        </div>
      </form>

      <div className="detail-container">
        <div className="title">Hasil Pencarian</div>
        <div className="sub">
          Menampilkan rekomendasi untuk: <b>{q}</b>
        </div>

        {/* ONLY TOP 5 */}
        <div className="title" style={{ margin: "20px 0 10px" }}>
          Rekomendasi Terbaik
        </div>

        <div className="grid">
  {loading ? (
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="card">
        <div className="card-media skeleton" style={{ height: 170 }} />
        <div className="skeleton" />
        <div className="skeleton" style={{ width: "60%" }} />
      </div>
    ))
  ) : filteredSorted.length === 0 ? (
    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
      <h2 style={{ fontWeight: 700, marginBottom: 10 }}>⚠ Produk Tidak Ditemukan</h2>
      <p style={{ color: "var(--muted)" }}>
        Tidak ada produk yang cocok dengan kata kunci <b>"{q}"</b>.
      </p>
    </div>
  ) : (
    top5.map((s) => (
      <div
        key={s.id}
        className="card"
        onClick={() => navigate(`/detail-speaker/${s.id}`)}
      >
        <div className="card-media">
          <img
            src={
              s.gambar
                ? imgUrl(s.gambar)
                : `https://via.placeholder.com/800x600?text=${encodeURIComponent(
                    s.nama
                  )}`
            }
            alt={s.nama}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 700 }}>{s.nama}</div>

          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            {s.ukuran}
          </div>

          <div style={{ marginTop: 6 }}>
            {renderStars(ratings[s.id])}
          </div>

          <div
            style={{
              color: "#dc2626",
              fontWeight: 800,
              marginTop: 8,
            }}
          >
            Rp {(s.harga || 0).toLocaleString()}
          </div>
        </div>
      </div>
    ))
  )}
</div>


        {/* 🔵 TOMBOL KEMBALI – POSISI TENGAH */}
        <button className="back-btn" onClick={() => navigate("/list-speaker")}>
          ← Kembali
        </button>

      </div>
    </MainLayout>
  );
}
