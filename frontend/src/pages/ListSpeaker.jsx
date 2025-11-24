import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imgUrl } from '../api';
import MainLayout from "../layout/MainLayout";

export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    api.get('/speakers').then((res) => setSpeakers(res.data));
  }, []);

  return (
    <MainLayout>

      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '25px',
            fontSize: '28px',
            fontWeight: '600',
          }}
        >
          Daftar Box Speaker
        </h2>

        {/* GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px',
          }}
        >
          {speakers.map((s) => (
            <div
              key={s.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 6px 14px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.2s',
              }}
            >
              <img
                src={imgUrl(s.gambar)}
                alt={s.nama}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '12px',
                }}
              />

              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                {s.nama}
              </h3>

              <p><b>Ukuran:</b> {s.ukuran}</p>
              <p>
                <b>Harga:</b>{' '}
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  Rp {s.harga.toLocaleString()}
                </span>
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <Link
                  to={`/detail-speaker/${s.id}`}
                  style={{
                    flex: 1,
                    background: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Detail
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </MainLayout>
  );
}
