import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import LiveEvents from './pages/LiveEvents';
import ContactUs from './pages/ContactUs';
import Announcements from './pages/Announcements';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-lightTechBackground relative">
      <Navbar />

      {/* Spacer for sticky navbar */}
      <div className="h-20" />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<LiveEvents />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Routes - Hidden */}
          <Route path="/lrnit-admin" element={<AdminLogin />} />
          <Route path="/lrnit-admin/dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
