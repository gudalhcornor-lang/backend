import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../api";
import MainLayout from "../layout/MainLayout";
export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const totalHarga = wishlist.reduce((t, item) => t + item.harga, 0);


  return (
    <MainLayout>

    <>
      <style>{`
        .wishlist-container {
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  background: #f8fafc;
}

        

        .wishlist-box {
          width: 100%;
          max-width: 900px;
          background: white;
          border-radius: 14px;
          padding: 25px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
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
          padding: 15px;
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
            <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
              Wishlist masih kosong.
            </p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {wishlist.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="prod-info">
                          <img
                            src={imgUrl(item.gambar)}
                            alt={item.nama}
                            className="prod-img"
                            onClick={() => navigate(`/detail-speaker/${item.id}`)}
                          />
                          <span>{item.nama}</span>
                        </div>
                      </td>

                      <td>Rp {item.harga.toLocaleString()}</td>

                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
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
                <button className="back-btn" onClick={() => navigate("/list-speaker")}>
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
