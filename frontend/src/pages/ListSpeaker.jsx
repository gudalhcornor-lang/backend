import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [ratings, setRatings] = useState({});
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [sizeFilter, setSizeFilter] = useState("all");

  const navigate = useNavigate();

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      const res = await api.get("/speakers");
      setSpeakers(res.data || []);

      const rMap = {};
      await Promise.all(
        (res.data || []).map(async (p) => {
          try {
            const r = await api.get(`/rating/product/${p.id}`);
            rMap[p.id] = r.data.average_rating ?? 0;
          } catch {
            rMap[p.id] = 0;
          }
        })
      );
      setRatings(rMap);
    };
    load();
  }, []);

  /* ================= UTIL ================= */
  const normalizeSize = (v) =>
    String(v || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

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

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    let list = [...speakers];

    if (query) {
      list = list.filter((p) =>
        p.nama.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sizeFilter !== "all") {
      list = list.filter((p) =>
        normalizeSize(p.ukuran).includes(normalizeSize(sizeFilter))
      );
    }

    list = list.map((p) => ({ ...p, _rating: ratings[p.id] ?? 0 }));

    if (sortBy === "name") list.sort((a, b) => a.nama.localeCompare(b.nama));
    else if (sortBy === "rating")
      list.sort((a, b) => b._rating - a._rating);
    else if (sortBy === "price_asc")
      list.sort((a, b) => a.harga - b.harga);
    else if (sortBy === "price_desc")
      list.sort((a, b) => b.harga - a.harga);

    return list;
  }, [speakers, ratings, query, sortBy, sizeFilter]);

  return (
    <MainLayout>
      <div className="catalog">
        <style>{`
          .catalog{
            padding:32px;
            min-height:100vh;
            background:linear-gradient(180deg,#f8fafc,#ffffff);
            font-family:Inter,system-ui;
          }

          /* ===== HEADER ===== */
          .header{
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            gap:24px;
            margin-bottom:26px;
          }

          .header-left{flex:1}
          .title{font-size:28px;font-weight:800;color:#0f172a}
          .subtitle{color:#64748b;margin:6px 0 16px}

          .search{
            width:100%;
            max-width:380px;
            padding:11px 14px;
            border-radius:12px;
            border:1px solid #e5e7eb;
            font-size:14px;
          }

          .filters{
            margin-top:12px;
            display:flex;
            gap:8px;
            flex-wrap:wrap;
          }

          .chip{
            padding:8px 14px;
            border-radius:999px;
            border:1px solid #e5e7eb;
            font-weight:600;
            font-size:13px;
            background:white;
            cursor:pointer;
          }

          .chip.active{
            background:#6366f1;
            color:white;
            border-color:#6366f1;
          }

          .header-right img{
            width:140px;
            object-fit:contain;
          }

          @media(max-width:900px){
            .header-right{display:none}
          }

          /* ===== GRID ===== */
          .grid{
            display:grid;
            grid-template-columns:repeat(4,1fr);
            gap:20px;
          }

          @media(max-width:1100px){
            .grid{grid-template-columns:repeat(2,1fr)}
          }

          @media(max-width:640px){
            .grid{grid-template-columns:1fr}
          }

          /* ===== CARD ===== */
          .card{
            background:white;
            border-radius:18px;
            border:1px solid #e5e7eb;
            box-shadow:0 10px 28px rgba(0,0,0,.06);
            cursor:pointer;
            transition:.22s ease;
            overflow:hidden;
          }

          .card:hover{
            transform:translateY(-6px);
            box-shadow:0 22px 46px rgba(0,0,0,.12);
          }

          .card-media{
            height:190px;
            background:#f8fafc;
            display:flex;
            align-items:center;
            justify-content:center;
          }

          .card-media img{
            width:100%;
            height:100%;
            object-fit:contain;
            padding:14px;
          }

          .card-body{padding:16px 18px}
          .card-title{font-size:16px;font-weight:800;color:#0f172a}
          .card-size{font-size:13px;color:#64748b;margin-bottom:8px}

          .stars .star{font-size:14px}
          .stars .full{color:#facc15}
          .stars .empty{color:#e5e7eb}

          .price-row{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:10px;
          }

          .price{font-size:18px;font-weight:800;color:#dc2626}
          .cta{font-size:13px;font-weight:700;color:#6366f1}
        `}</style>

        {/* HEADER */}
        <div className="header">
          <div className="header-left">
            <div className="title">Katalog Box Speaker</div>
            <div className="subtitle">
              Pilih model box speaker sesuai ukuran dan kebutuhan
            </div>

            <input
              className="search"
              placeholder="Cari nama speaker..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="filters">
              {["all", "10inch", "12inch", "15inch", "18inch"].map((s) => (
                <button
                  key={s}
                  className={`chip ${sizeFilter === s ? "active" : ""}`}
                  onClick={() => setSizeFilter(s)}
                >
                  {s === "all" ? "Semua" : s}
                </button>
              ))}
            </div>
          </div>

          {/* LOGO KANAN */}
          <div className="header-right">
            <img
            src="http://127.0.0.1:8000/img/cap.png"
            alt="Logo CAP"
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid">
          {filtered.map((s) => (
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
                      : "https://via.placeholder.com/500x400?text=No+Image"
                  }
                  alt={s.nama}
                />
              </div>

              <div className="card-body">
                <div className="card-title">{s.nama}</div>
                <div className="card-size">{s.ukuran}</div>
                {renderStars(ratings[s.id])}

                <div className="price-row">
                  <div className="price">
                    Rp {(s.harga || 0).toLocaleString()}
                  </div>
                  <div className="cta">Lihat detail →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
