import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../api";
import api from "../api";
import MainLayout from "../layout/MainLayout";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // 🔥 Ambil wishlist dari database
  useEffect(() => {
    api
      .get("/wishlist")
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Error fetch wishlist:", err));
  }, []);

  // 🔥 Hapus item dari wishlist (berdasarkan speaker_id)
  const removeItem = async (speakerId) => {
    try {
      await api.delete(`/wishlist/${speakerId}`);

      // Hapus hanya item yang memiliki speaker_id tersebut
      setWishlist((prev) =>
        prev.filter((item) => item.speaker.id !== speakerId)
      );
    } catch (err) {
      console.error("Gagal hapus wishlist:", err);
    }
  };

  const totalHarga = wishlist.reduce(
    (total, item) => total + item.speaker.harga,
    0
  );

  return (
    <MainLayout>
      <>
        <style>{`
          .wishlist-container {
            width: 94vw;
            min-height: calc(100vh - 80px);
            background: #f8fafc;
            display: flex;
            justify-content: center;
            padding: 1px;
          }

          .wishlist-box {
            width: 100vw;
            background: white;
            border-radius: 14px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }

          .title {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            text-align: center;
            margin-bottom: 25px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            background: #f1f5f9;
            padding: 12px;
            font-size: 16px;
            border-bottom: 2px solid #e2e8f0;
            color: #1e293b;
            text-align: left;
          }

          td {
            padding: 14px 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 15px;
          }

          .prod-info {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .prod-img {
            width: 65px;
            height: 65px;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            cursor: pointer;
          }

          .remove-btn {
            padding: 8px 14px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          }

          .remove-btn:hover {
            background: #dc2626;
          }

          .total-row {
            text-align: right;
            padding: 15px 0;
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
          }

          .back-btn {
            margin-top: 20px;
            background: #475569;
            border: none;
            padding: 10px 20px;
            color: white;
            border-radius: 10px;
            font-size: 15px;
            cursor: pointer;
          }

          .back-btn:hover {
            background: #334155;
          }
        `}</style>

        <div className="wishlist-container">
          <div className="wishlist-box">
            <h1 className="title">Wishlist Saya</h1>

            {wishlist.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  padding: "20px",
                }}
              >
                Wishlist masih kosong.
              </p>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nama Produk</th>
                      <th>Harga</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {wishlist.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="prod-info">
                            <img
                              src={imgUrl(item.speaker.gambar)}
                              alt={item.speaker.nama}
                              className="prod-img"
                              onClick={() =>
                                navigate(`/detail-speaker/${item.speaker.id}`)
                              }
                            />
                            <span>{item.speaker.nama}</span>
                          </div>
                        </td>

                        <td>Rp {item.speaker.harga.toLocaleString()}</td>

                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => removeItem(item.speaker.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="total-row">
                  Total: Rp {totalHarga.toLocaleString()}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    className="back-btn"
                    onClick={() => navigate("/list-speaker")}
                  >
                    ← Kembali
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </MainLayout>
  );
}
