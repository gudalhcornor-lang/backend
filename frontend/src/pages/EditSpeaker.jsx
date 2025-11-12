import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditSpeaker() {
  const { id } = useParams();
  const [form, setForm] = useState({nama:'',ukuran:'',bahan:'',harga:'',deskripsi:''});
  const [gambar, setGambar] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/speakers/${id}`).then(res => setForm(res.data));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k,v]) => data.append(k,v));
    if (gambar) data.append('gambar', gambar);
    await api.post(`/speakers/${id}?_method=PUT`, data, {
      headers: {'Content-Type':'multipart/form-data'}
    });
    nav('/');
  };

  return (
    <div style={{maxWidth:500}}>
      <h2>Edit Box Speaker</h2>
      <form onSubmit={submit}>
        <input value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} required/><br/>
        <input value={form.ukuran} onChange={e=>setForm({...form,ukuran:e.target.value})} required/><br/>
        <input value={form.bahan} onChange={e=>setForm({...form,bahan:e.target.value})} required/><br/>
        <input type="number" value={form.harga} onChange={e=>setForm({...form,harga:e.target.value})} required/><br/>
        <textarea value={form.deskripsi||''} onChange={e=>setForm({...form,deskripsi:e.target.value})}></textarea><br/>
        <input type="file" onChange={e=>setGambar(e.target.files[0])}/><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
