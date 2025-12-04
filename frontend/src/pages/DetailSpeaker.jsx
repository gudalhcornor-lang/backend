import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

export default function DetailSpeaker() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetail();
    loadRatingList();
    loadMyRating();
    loadRelated();
  }, [id]);

  const loadDetail = () => {
    api.get(`/speakers/${id}`)
      .then((res) => setData(res.data))
      .catch(() => console.log("Gagal memuat data"));
  };

  const loadRelated = () => {
    api.get(`/speakers/${id}/related`)
      .then((res) => setRelated(res.data))
      .catch(() => console.log("Gagal memuat rekomendasi"));
  };

 const loadRatingList = () => {
  api.get(`/rating/product/${id}`)
    .then((res) => {
      // ambil data dari backend
      setAvgRating(res.data.average_rating || 0);
      setTotalUser(res.data.rating_count || 0);
      setRatingList(res.data.ratings || []);
    })
    .catch(() => {});
};


  const loadMyRating = () => {
    api.get(`/rating/my/${id}`)
      .then((res) => setMyRating(res.data.rating || 0))
      .catch(() => {});
  };

  const sendRating = (value) => {
    setMyRating(value);
    api.post("/rating", { speaker_id: id, rating: value })
      .then(() => loadRatingList())
      .catch(() => {});
  };

  if (!data) return <p>Loading...</p>;

  const addToWishlist = () => {
    api.post("/wishlist", { speaker_id: data.id })
      .then(() => navigate("/wishlist"))
      .catch((err) => {
        if (err.response?.status === 409) navigate("/wishlist");
      });
  };

  const shareProduct = async () => {
    const shareData = {
      title: data.nama,
      text: `Cek produk ini: ${data.nama}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link produk disalin!");
    }
  };

  return (
    <MainLayout>
      <>
        <style>{`
          .detail-container {
            width: 100vw;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            background: #f8fafc;
          }
          .detail-wrapper {
            width: 100%;
            display: flex;
            gap: 35px;
            background: #ffffff;
            padding: 35px;
            box-sizing: border-box;
          }
          .left-section { flex: 1; }
          .product-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            border-radius: 12px;
          }
          .right-section {
            flex: 1.2;
            display: flex;
            flex-direction: column;
            padding: 20px;
            overflow-y: auto;
          }
          .product-title { font-size: 32px; font-weight: 700; color: #1e293b; }
          .price { font-size: 26px; font-weight: 700; color: #dc2626; margin-bottom: 20px; }
          .info-box {
            padding: 14px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            margin-bottom: 10px;
            font-size: 16px;
          }
         .section-title { margin-top: 25px; font-size: 18px; font-weight: 600; color: #334155; }
          .description { color: #475569; font-size: 15px; line-height: 1.6; }

          .btn-row { display: flex; gap: 14px; margin-top: 26px; }
          .btn {
            flex: 1;
            padding: 10px 14px;
            font-size: 15px;
            font-weight: 600;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: .2s;
          }
              .star {
            font-size: 28px;
            cursor: pointer;
            transition: .2s;
          }
          .star:hover { transform: scale(1.1); }

          .avg-box {
            margin-top: 8px;
            color: #1e293b;
            font-size: 15px;
            font-weight: 600;
          }
          .btn-back { background: #64748b; color: white; }
          .btn-back:hover { background: #475569; }
          .btn-wishlist { background: #f43f5e; color: white; }
          .btn-wishlist:hover { background: #e11d48; }
          .btn-share { background: #0ea5e9; color: white; }
          .btn-share:hover { background: #0284c7; }
          /* ⭐ REKOMENDASI */
          .related-container {
            margin-top: 40px;
          }
          .related-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 15px;
          }
          .related-list {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            padding-bottom: 10px;
          }
          .related-card {
            width: 180px;
            min-width: 180px;
            background: white;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #e2e8f0;
            transition: .2s;
          }
          .related-card:hover {
            transform: scale(1.03);
            border-color: #94a3b8;
          }
          .related-img {
            width: 100%;
            height: 130px;
            object-fit: cover;
            border-radius: 8px;
          }
          .related-name {
            font-size: 14px;
            font-weight: 600;
            margin-top: 8px;
            color: #334155;
          }
          .related-price {
            font-size: 13px;
            color: #dc2626;
            font-weight: 700;
          }

          @media (max-width: 900px) {
            .detail-wrapper { flex-direction: column; padding: 10px; gap: 15px; }
          }
            /* ⭐ MODAL POPUP */
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .modal-content {
            background: white;
            padding: 10px;
            border-radius: 10px;
            max-width: 90%;
            max-height: 90%;
          }

          .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }

        `}</style>

        <div className="detail-container">
          <div className="detail-wrapper">
            
            <div className="left-section">
              <img
                src={imgUrl(data.gambar)}
                alt={data.nama}
                className="product-img"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            <div className="right-section">
              <h1 className="product-title">{data.nama}</h1>

              <div className="price">Rp {data.harga.toLocaleString()}</div>

              <div className="info-box"><b>Ukuran:</b> {data.ukuran}</div>
              <div className="info-box"><b>Bahan:</b> {data.bahan}</div>

              <h3 className="section-title">Deskripsi Produk</h3>
              <p className="description">{data.deskripsi || "Tidak ada deskripsi."}</p>

              {/* ⭐ RATING */}
              <h3 className="section-title">Rating Produk</h3>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="star"
                    style={{ color: star <= myRating ? "#f59e0b" : "#94a3b8" }}
                    onClick={() => sendRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="avg-box">
                ⭐ {avgRating} dari {totalUser} pengguna
              </div>

              <div className="btn-row">
                <button className="btn btn-back" onClick={() => navigate("/list-speaker")}>← Kembali</button>
                <button className="btn btn-wishlist" onClick={addToWishlist}>♥ Wishlist</button>
                <button className="btn btn-share" onClick={shareProduct}>⤴ Share</button>
              </div>

              {/* ⭐ Rekomendasi */}
              <div className="related-container">
                <div className="related-title">Rekomendasi Produk Lain</div>
                <div className="related-list">
                  {related.length === 0 ? (
                    <p>Tidak ada rekomendasi.</p>
                  ) : (
                    related.map((item) => (
                      <div
                        className="related-card"
                        key={item.id}
                        onClick={() => navigate(`/detail-speaker/${item.id}`)}
                      >
                        <img src={imgUrl(item.gambar)} alt={item.nama} className="related-img" />
                        <div className="related-name">{item.nama}</div>
                        <div className="related-price">Rp {item.harga.toLocaleString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={imgUrl(data.gambar)} alt={data.nama} />
            </div>
          </div>
        )}
      </>
    </MainLayout>
  );
}
