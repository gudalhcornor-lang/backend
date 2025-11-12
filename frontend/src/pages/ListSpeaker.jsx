import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imgUrl } from '../api';

export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    api.get('/speakers').then((res) => setSpeakers(res.data));
  }, []);

  return (
    <div>
      <h2>Daftar Box Speaker</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px,1fr))', gap:20}}>
        {speakers.map((s) => (
          <div key={s.id} style={{border:'1px solid #ccc', borderRadius:10, padding:10}}>
            {s.gambar && <img src={imgUrl(s.gambar)} alt={s.nama} style={{width:'100%', borderRadius:10}} />}
            <h3>{s.nama}</h3>
            <p><b>Ukuran:</b> {s.ukuran}</p>
            <p><b>Harga:</b> Rp {s.harga.toLocaleString()}</p>
            <Link to={`/detail/${s.id}`}>Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
