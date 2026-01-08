import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiArrowLeft, FiHeart, FiShare2 } from "react-icons/fi";

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

  if (!data) return <p className="text-center mt-5">Loading...</p>;

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
      <div className="container my-5">
        <div className="row g-4">
          {/* LEFT IMAGE */}
          <div className="col-lg-5">
            <img
              src={imgUrl(data.gambar)}
              alt={data.nama}
              className="img-fluid rounded shadow-sm cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="col-lg-7">
            <h1 className="fw-bold">{data.nama}</h1>
            <h3 className="text-danger my-3">Rp {data.harga.toLocaleString()}</h3>

            <div className="mb-2 p-3 bg-light rounded shadow-sm">
              <b>Ukuran:</b> {data.ukuran}
            </div>
            <div className="mb-3 p-3 bg-light rounded shadow-sm">
              <b>Bahan:</b> {data.bahan}
            </div>

            <h5 className="mt-4 fw-semibold">Deskripsi Produk</h5>
            <p className="text-secondary">{data.deskripsi || "Tidak ada deskripsi."}</p>

            {/* RATING */}
            <h5 className="mt-4 fw-semibold">Rating Produk</h5>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="fs-3 me-1"
                  style={{ color: star <= myRating ? "#f59e0b" : "#adb5bd", cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => sendRating(star)}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-muted">⭐ {avgRating} dari {totalUser} pengguna</p>

            {/* ICON BUTTONS */}
            <div className="d-flex flex-wrap gap-3 mt-3">
              <button
                className="btn btn-secondary d-flex align-items-center justify-content-center flex-grow-1"
                onClick={() => navigate("/list-speaker")}
                title="Kembali"
              >
                <FiArrowLeft size={24} />
              </button>

              <button
                className="btn btn-danger d-flex align-items-center justify-content-center flex-grow-1"
                onClick={addToWishlist}
                title="Wishlist"
              >
                <FiHeart size={24} />
              </button>

              <button
                className="btn btn-info d-flex align-items-center justify-content-center flex-grow-1"
                onClick={shareProduct}
                title="Share"
              >
                <FiShare2 size={24} />
              </button>
            </div>

            {/* REKOMENDASI */}
            <div className="mt-5">
              <h5 className="fw-bold mb-3">Rekomendasi Produk Lain</h5>
              <div className="d-flex gap-3 overflow-auto pb-2">
                {related.length === 0 ? (
                  <p className="text-muted">Tidak ada rekomendasi.</p>
                ) : (
                  related.map((item) => (
                    <div
                      key={item.id}
                      className="card flex-shrink-0 shadow-sm"
                      style={{ width: "180px", cursor: "pointer", transition: "transform 0.2s" }}
                      onClick={() => navigate(`/detail-speaker/${item.id}`)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <img
                        src={imgUrl(item.gambar)}
                        className="card-img-top"
                        alt={item.nama}
                        style={{ height: "130px", objectFit: "cover" }}
                      />
                      <div className="card-body p-2">
                        <h6 className="card-title mb-1">{item.nama}</h6>
                        <p className="text-danger fw-bold mb-0">Rp {item.harga.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="modal show d-block" onClick={() => setIsModalOpen(false)}>
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-body p-0">
                  <img src={imgUrl(data.gambar)} className="img-fluid" alt={data.nama} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
