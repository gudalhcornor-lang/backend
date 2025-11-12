import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddAdmin from "./pages/AddAdmin";
import Login from "./pages/Login";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Aplikasi Katalog Box Speaker</h1>
      <p>Gunakan menu di atas untuk menambah admin atau login.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Navigasi sederhana */}
      <nav
        style={{
          padding: "10px",
          background: "#f3f3f3",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ marginRight: "15px" }}>
          Beranda
        </Link>
        <Link to="/add-admin" style={{ marginRight: "15px" }}>
          Tambah Admin
        </Link>
        <Link to="/login">Login Admin</Link>
      </nav>

      {/* Routing Halaman */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
