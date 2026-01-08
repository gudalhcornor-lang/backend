import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../api";
import api from "../api";
import MainLayout from "../layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/wishlist")
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Error fetch wishlist:", err));
  }, []);

  const removeItem = async (speakerId) => {
    try {
      await api.delete(`/wishlist/${speakerId}`);
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
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-4">Wishlist Saya</h1>

        {wishlist.length === 0 ? (
          <p className="text-center text-muted py-4">Wishlist masih kosong.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded bg-white p-3">
            <table className="table align-middle">
              <thead className="table-light">
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
                      <div
                        className="d-flex align-items-center gap-3 cursor-pointer"
                        onClick={() =>
                          navigate(`/detail-speaker/${item.speaker.id}`)
                        }
                      >
                        <img
                          src={imgUrl(item.speaker.gambar)}
                          alt={item.speaker.nama}
                          className="rounded shadow-sm"
                          style={{ width: "65px", height: "65px", objectFit: "cover" }}
                        />
                        <span className="fw-semibold">{item.speaker.nama}</span>
                      </div>
                    </td>
                    <td className="fw-bold text-danger">
                      Rp {item.speaker.harga.toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                        onClick={() => removeItem(item.speaker.id)}
                        title="Hapus"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end fw-bold fs-5 mt-3">
              Total: Rp {totalHarga.toLocaleString()}
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-secondary d-flex align-items-center justify-content-center px-4"
                onClick={() => navigate("/list-speaker")}
                title="Kembali"
              >
                <FiArrowLeft size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
