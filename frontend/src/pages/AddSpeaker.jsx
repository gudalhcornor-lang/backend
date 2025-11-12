import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddSpeaker() {
  const [form, setForm] = useState({nama:'',ukuran:'',bahan:'',harga:'',deskripsi:''});
  const [gambar, setGambar] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k,v]) => data.append(k,v));
    if (gambar) data.append('gambar', gambar);

    await api.post('/speakers', data, {
      headers: {'Content-Type': 'multipart/form-data'}
    });

    nav('/');
  };

  return (
    <div style={{maxWidth:500}}>
      <h2>Tambah Box Speaker</h2>
      <form onSubmit={submit}>
        <input placeholder="Nama" onChange={e=>setForm({...form,nama:e.target.value})} required/><br/>
        <input placeholder="Ukuran" onChange={e=>setForm({...form,ukuran:e.target.value})} required/><br/>
        <input placeholder="Bahan" onChange={e=>setForm({...form,bahan:e.target.value})} required/><br/>
        <input type="number" placeholder="Harga" onChange={e=>setForm({...form,harga:e.target.value})} required/><br/>
        <textarea placeholder="Deskripsi" onChange={e=>setForm({...form,deskripsi:e.target.value})}></textarea><br/>
        <input type="file" onChange={e=>setGambar(e.target.files[0])}/><br/>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
