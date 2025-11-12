import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imgUrl } from '../api';

export default function ListSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get('/speakers').then(res => setSpeakers(res.data));
  }, []);

  const hapus = async (id) => {
    if (!confirm('Hapus data ini?')) return;
    await api.delete(`/speakers/${id}`);
    setSpeakers(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div>
      <h2>Daftar Box Speaker</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px,1fr))',gap:20}}>
        {speakers.map(s => (
          <div key={s.id} style={{border:'1px solid #ccc',padding:10,borderRadius:10}}>
            {s.gambar && <img src={imgUrl(s.gambar)} alt={s.nama} style={{width:'100%',borderRadius:10}} />}
            <h3>{s.nama}</h3>
            <p><b>Ukuran:</b> {s.ukuran}</p>
            <p><b>Harga:</b> Rp {s.harga.toLocaleString()}</p>
            <Link to={`/detail/${s.id}`}>Detail</Link>
            {token && (
              <>
                {' | '}<Link to={`/edit/${s.id}`}>Edit</Link>
                {' | '}<button onClick={()=>hapus(s.id)}>Hapus</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
