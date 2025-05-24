import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>خدمة الباحث الأكاديمي</h1>
          <p>منصة متخصصة في تقديم الخدمات الأكاديمية للباحثين العرب في مختلف المجالات والتخصصات</p>
          <div className="hero-buttons">
            <a href="#services" className="btn btn-primary">خدماتنا</a>
            <a href="#about" className="btn btn-secondary">تعرف علينا</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
