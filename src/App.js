import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import BlogPage from './pages/BlogPage/BlogPage';
import GuidesPage from './pages/GuidesPage/GuidesPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
