import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { setToken } from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AddAdmin from "./pages/AddAdmin";
import AddSpeaker from "./pages/AddSpeaker";
import DetailSpeaker from "./pages/DetailSpeaker";
import EditSpeaker from "./pages/EditSpeaker";
import ListSpeaker from "./pages/ListSpeaker";
import ListSpeakerAdmin from "./pages/ListSpeakerAdmin";   // ✅ WAJIB DIIMPORT
import Wishlist from "./pages/Wishlist"; 

function App() {

  // LOAD TOKEN SAAT APLIKASI PERTAMA DIBUKA
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/list-speakeradmin" element={<ListSpeakerAdmin />} />

        {/* Speaker CRUD */}
        <Route path="/add-speaker" element={<AddSpeaker />} />
        <Route path="/detail-speaker/:id" element={<DetailSpeaker />} />
        <Route path="/edit-speaker/:id" element={<EditSpeaker />} />
        <Route path="/list-speaker" element={<ListSpeaker />} />
        <Route path="/wishlist" element={<Wishlist />} />
   <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
