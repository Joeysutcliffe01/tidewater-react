import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSite } from "./context/SiteContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AdminLogin from "./components/admin/AdminLogin";
import EditorPanel from "./components/admin/EditorPanel";
import EditorToggle from "./components/admin/EditorToggle";
import Intro from "./pages/Intro";
import Fishing from "./pages/Fishing";
import Sightseeing from "./pages/Sightseeing";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function AppInner() {
  const { isAdmin } = useSite();
  const [showLogin, setShowLogin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Listen for #admin in URL
  useEffect(() => {
    function checkHash() {
      if (window.location.hash === "#admin") {
        history.replaceState(null, "", window.location.pathname);
        if (!isAdmin) setShowLogin(true);
      }
    }
    // Small delay so hash is readable on mount
    setTimeout(checkHash, 100);
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [isAdmin]);

  // Close editor if admin logs out
  useEffect(() => {
    if (!isAdmin) setIsEditing(false);
  }, [isAdmin]);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/fishing" element={<Fishing />} />
        <Route path="/sightseeing" element={<Sightseeing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      {/* ADMIN UI */}
      {showLogin && !isAdmin && (
        <AdminLogin onClose={() => setShowLogin(false)} />
      )}

      <EditorToggle
        isEditing={isEditing}
        onToggle={() => setIsEditing((prev) => !prev)}
      />

      {isAdmin && isEditing && (
        <EditorPanel onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
