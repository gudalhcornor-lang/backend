import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListSpeaker from './pages/ListSpeaker';
import AddSpeaker from './pages/AddSpeaker';
import DetailSpeaker from './pages/DetailSpeaker';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Katalog Box Speaker</h1>
        <nav>
          <Link to="/">Daftar</Link> | <Link to="/tambah">Tambah</Link>
        </nav>
        <hr/>
        <Routes>
          <Route path="/" element={<ListSpeaker />} />
          <Route path="/tambah" element={<AddSpeaker />} />
          <Route path="/detail/:id" element={<DetailSpeaker />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
