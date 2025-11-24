import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";

export default function DetailSpeaker() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // untuk modal gambar
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/speakers/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === data.id);

    if (!exists) {
      wishlist.push(data);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    navigate("/wishlist");
  };

  const shareProduct = async () => {
    const shareData = {
      title: data.nama,
      text: `Cek produk ini: ${data.nama}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link produk disalin!");
    }
  };

  return (
    <MainLayout>
      <>
        <style>{`
          html, body, #root, .main-layout {
            height: 100%;
            margin: 0;
          }

          .detail-container {
            width: 100vw;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f8fafc;
            box-sizing: border-box;
          }

          .detail-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            gap: 35px;
            background: #ffffff;
            padding: 35px;
            box-sizing: border-box;
          }

          .left-section {
            flex: 1;
          }

          .product-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
          }

          .right-section {
            flex: 1.2;
            display: flex;
            flex-direction: column;
            padding: 20px;
            overflow-y: auto;
          }

          .product-title { font-size: 30px; font-weight: 700; color: #1e293b; margin-bottom: 10px; }
          .price { font-size: 24px; font-weight: 700; color: #dc2626; margin-bottom: 20px; }
          .info-box { padding: 12px 16px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 10px; font-size: 15px; }
          .section-title { margin-top: 25px; font-size: 17px; font-weight: 600; color: #334155; margin-bottom: 8px; }
          .description { color: #475569; font-size: 15px; line-height: 1.6; }
          .btn-row { display: flex; gap: 14px; margin-top: 26px; }
          .btn { flex: 1; padding: 10px 14px; font-size: 15px; font-weight: 600; border-radius: 10px; border: none; cursor: pointer; transition: .2s; display: flex; justify-content: center; align-items: center; gap: 6px; }
          .btn-back { background: #64748b; color: white; }
          .btn-back:hover { background: #475569; }
          .btn-wishlist { background: #f43f5e; color: white; }
          .btn-wishlist:hover { background: #e11d48; }
          .btn-share { background: #0ea5e9; color: white; }
          .btn-share:hover { background: #0284c7; }

          /* Modal / Lightbox */
          .modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }
          .modal-content {
            max-width: 90%;
            max-height: 90%;
          }
          .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }

          @media (max-width: 900px) {
            .detail-wrapper { flex-direction: column; padding: 10px; gap: 15px; }
            .left-section, .product-img { height: 300px; }
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
              <div className="info-box"><b>ID Produk:</b> #{data.id}</div>

              <h3 className="section-title">Deskripsi Produk</h3>
              <p className="description">{data.deskripsi || "Tidak ada deskripsi untuk produk ini."}</p>

              <div className="btn-row">
                <button className="btn btn-back" onClick={() => navigate("/list-speaker")}>← Kembali</button>
                <button className="btn btn-wishlist" onClick={addToWishlist}>♥ Wishlist</button>
                <button className="btn btn-share" onClick={shareProduct}>⤴ Share</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lightbox */}
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
