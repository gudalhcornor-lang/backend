import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { imgUrl } from '../api';

export default function DetailSpeaker() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/speakers/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{maxWidth:600}}>
      {data.gambar && <img src={imgUrl(data.gambar)} alt={data.nama} style={{width:'100%', borderRadius:10}} />}
      <h2>{data.nama}</h2>
      <p><b>Ukuran:</b> {data.ukuran}</p>
      <p><b>Bahan:</b> {data.bahan}</p>
      <p><b>Harga:</b> Rp {data.harga.toLocaleString()}</p>
      <p>{data.deskripsi}</p>
    </div>
  );
}
