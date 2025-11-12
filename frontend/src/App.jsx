import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddAdmin from "./pages/AddAdmin";
import AddSpeaker from "./pages/AddSpeaker";
import DetailSpeaker from "./pages/DetailSpeaker";
import EditSpeaker from "./pages/EditSpeaker";
import ListSpeaker from "./pages/ListSpeaker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/add-speaker" element={<AddSpeaker />} />
        <Route path="/detail-speaker/:id" element={<DetailSpeaker />} />
        <Route path="/edit-speaker/:id" element={<EditSpeaker />} />
        <Route path="/list-speaker" element={<ListSpeaker />} />
      </Routes>
    </Router>
  );
}

export default App;
