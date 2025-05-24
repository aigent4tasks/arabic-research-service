import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>خدمة الباحث الأكاديمي</h1>
            </Link>
          </div>
          
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">الرئيسية</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">خدماتنا</Link>
              </li>
              <li className="nav-item">
                <Link to="/guides" className="nav-link">الأدلة الأكاديمية</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">المدونة</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">من نحن</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">اتصل بنا</Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-primary">طلب خدمة</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
