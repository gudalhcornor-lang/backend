import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

// 🔵🟣 Modern Gradient Catalog UI
export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [ratings, setRatings] = useState({});
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [sizeFilter, setSizeFilter] = useState("all");

  const navigate = useNavigate();

  // ---------------- LOAD SPEAKERS ----------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/speakers");
        setSpeakers(res.data || []);

        const ratingData = {};
        await Promise.all(
          (res.data || []).map(async (p) => {
            try {
              const r = await api.get(`/rating/product/${p.id}`);
              ratingData[p.id] = r.data.average_rating ?? 0;
            } catch {
              ratingData[p.id] = 0;
            }
          })
        );

        setRatings(ratingData);
      } catch (err) {
        console.error("Gagal load speakers", err);
      }
    };

    load();
  }, []);

  // ---------------- SEARCH DEBOUNCE ----------------
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      220
    );
    return () => clearTimeout(t);
  }, [query]);

  // ---------------- NORMALIZE SIZE ----------------
  const normalizeSize = (v) =>
    String(v || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, ""); // hapus simbol (- ' " ,)

  // ---------------- RENDER STARS ----------------
  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <span className="stars" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < full ? "star full" : "star empty"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  // ---------------- FILTER + SORT ----------------
  const filtered = useMemo(() => {
    let list = [...speakers];

    // filter: search
    if (debouncedQuery) {
      list = list.filter(
        (p) =>
          (p.nama || "").toLowerCase().includes(debouncedQuery) ||
          String(p.ukuran || "")
            .toLowerCase()
            .includes(debouncedQuery)
      );
    }

    // filter: size (ANTI ERROR)
    if (sizeFilter !== "all") {
      const target = normalizeSize(sizeFilter); // contoh: "10inch"
      list = list.filter((p) =>
        normalizeSize(p.ukuran).includes(target)
      );
    }

    // attach rating
    list = list.map((p) => ({ ...p, _rating: ratings[p.id] ?? 0 }));

    // sort
    if (sortBy === "name") list.sort((a, b) => a.nama.localeCompare(b.nama));
    else if (sortBy === "rating") list.sort((a, b) => b._rating - a._rating);
    else if (sortBy === "price_asc")
      list.sort((a, b) => (a.harga || 0) - (b.harga || 0));
    else if (sortBy === "price_desc")
      list.sort((a, b) => (b.harga || 0) - (a.harga || 0));
    else
      list.sort((a, b) => b._rating - a._rating || a.nama.localeCompare(b.nama));

    return list;
  }, [speakers, debouncedQuery, sortBy, sizeFilter, ratings]);

  // ---------------- UI ----------------
  return (
    <MainLayout>
      <div className="grad-wrap">
        <style>{`
          :root{ --accent1:#5eead4; --accent2:#7c3aed; --muted:#94a3b8; --gold:#f6c84c }

          .grad-wrap{
            padding:32px;
            font-family:"Inter",system-ui;
            background:linear-gradient(180deg,#f7f9ff,#fbfbff);
            min-height:100vh;
          }

          .hero{
            border-radius:16px;
            padding:36px;
            display:flex;
            gap:20px;
            align-items:center;
            background:linear-gradient(135deg,rgba(124,58,237,.08),rgba(59,130,246,.06));
            box-shadow:0 10px 30px rgba(99,102,241,.08);
            margin-bottom:22px;
          }

          .hero-title{font-size:28px;font-weight:800;color:#0b1220;margin-bottom:6px}
          .hero-sub{color:var(--muted);margin-bottom:14px}

          .hero-search{
            display:flex;align-items:center;gap:12px;
            background:rgba(255,255,255,.9);
            padding:10px 14px;border-radius:12px;width:70%;
            box-shadow:0 6px 30px rgba(124,58,237,.12);
            border:1px solid rgba(124,58,237,.08)
          }
          .hero-search input{border:none;outline:none;font-size:15px;background:transparent;flex:1}

          .hero-art{width:260px;height:140px;border-radius:12px;object-fit:cover}

          .controls{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:18px 0}
          .filters{display:flex;gap:8px;flex-wrap:wrap}

          .chip{
            padding:8px 12px;border-radius:999px;
            border:1px solid rgba(15,23,42,.05);
            font-weight:600;color:#334155;background:transparent;cursor:pointer;
          }
          .chip.active{
            background:linear-gradient(90deg,#6366f1,#7c3aed);
            color:white;box-shadow:0 6px 18px rgba(124,58,237,.12)
          }

          .select{
            padding:8px 10px;border-radius:10px;border:1px solid rgba(15,23,42,.06);
            background:white;font-weight:600;
          }

          .grid{
            display:grid;grid-template-columns:repeat(4,1fr);gap:18px;
          }
          @media(max-width:1100px){
            .grid{grid-template-columns:repeat(2,1fr)}
            .hero-art{display:none}
          }
          @media(max-width:640px){
            .grid{grid-template-columns:1fr}
            .hero-search{width:100%}
          }

          .card{
            background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,.95));
            border-radius:14px;padding:12px;
            box-shadow:0 8px 30px rgba(15,23,42,.06);
            border:1px solid rgba(124,58,237,.06);
            cursor:pointer;transition:.16s ease;
          }
          .card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(15,23,42,.12)}

          .card-media{height:170px;overflow:hidden;border-radius:10px}
          .card-media img{width:100%;height:100%;object-fit:cover}

          .title{font-weight:700;font-size:16px;color:#06102b}
          .sub{color:var(--muted);font-size:13px}

          .row{display:flex;justify-content:space-between;align-items:center}
          .badge{
            background:linear-gradient(90deg,#7c3aed,#60a5fa);
            padding:6px 8px;border-radius:8px;font-weight:700;font-size:12px;color:white
          }

          .price{color:#dc2626;font-weight:800}
          .stars .star{font-size:14px;margin-right:3px}
          .stars .full{color:var(--gold)}
          .stars .empty{color:#e6e9ef}

          .empty-state{grid-column:1/-1;text-align:center;color:var(--muted);padding:40px}
        `}</style>

        {/* HERO */}
        <div className="hero">
          <div style={{ flex: 1 }}>
            <div className="hero-title">Daftar Box Speaker</div>
            <div className="hero-sub">
              Katalog model box speaker — referensi ukuran, tipe, dan foto.
            </div>

            <div className="hero-search">
              <span>🔎</span>
              <input
                placeholder="Cari nama produk atau ukuran..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  ✖
                </button>
              )}
            </div>
          </div>

          <img
            className="hero-art"
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop"
            alt="hero"
          />
        </div>

        {/* FILTER & SORT */}
        <div className="controls">
          <div className="filters">
            {[
              { key: "all", label: "Semua" },
              { key: "10inch", label: "10 inch" },
              { key: "12inch", label: "12 inch" },
              { key: "15inch", label: "15 inch" },
              { key: "18inch", label: "18 inch" },
            ].map((f) => (
              <button
                key={f.key}
                className={`chip ${sizeFilter === f.key ? "active" : ""}`}
                onClick={() => setSizeFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">Direkomendasikan</option>
            <option value="name">Nama (A-Z)</option>
            <option value="rating">Rating Tinggi</option>
            <option value="price_asc">Harga Termurah</option>
            <option value="price_desc">Harga Termahal</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid">
          {filtered.length === 0 && (
            <div className="empty-state">Tidak ada produk ditemukan.</div>
          )}

          {filtered.map((s) => (
            <article
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
                          s.nama || "No Image"
                        )}`
                  }
                  alt={s.nama}
                />
              </div>

              <div className="card-body">
                <div className="row">
                  <div>
                    <div className="title">{s.nama}</div>
                    <div className="sub">{s.ukuran}</div>
                  </div>

                  <div>
                    {String(s.nama || "").toLowerCase().includes("mini") && (
                      <div className="badge">Mini</div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {renderStars(ratings[s.id])}
                 </div>


                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <div className="price">
                    Rp {(s.harga || 0).toLocaleString()}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>
                    Lihat detail →
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
