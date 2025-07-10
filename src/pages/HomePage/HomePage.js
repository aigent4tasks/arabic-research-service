import React from 'react';
import './HomePage.css';
import Hero from '../../components/home/Hero';
import FeaturedServices from '../../components/home/FeaturedServices';
import AboutSection from '../../components/home/AboutSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import BooksSection from '../../components/books/BooksSection';
import BlogPostsSection from '../../components/blog/BlogPostsSection';
import AcademicServicesSection from '../../components/academic/AcademicServicesSection';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedServices />
      
      {/* Featured Books Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>الكتب المميزة</h2>
            <p>مجموعة مختارة من أفضل الكتب والأدلة البحثية</p>
          </div>
          <BooksSection limit={6} />
          <div className="section-footer">
            <a href="#/guides" className="view-all-btn">
              عرض جميع الكتب
            </a>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>أحدث التدوينات العلمية</h2>
            <p>مقالات وتدوينات علمية حديثة لمساعدة الباحثين</p>
          </div>
          <BlogPostsSection limit={4} />
          <div className="section-footer">
            <a href="#/blog" className="view-all-btn">
              عرض جميع التدوينات
            </a>
          </div>
        </div>
      </section>

      {/* Academic Services Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>خدماتنا الأكاديمية</h2>
            <p>خدمات متخصصة لدعم الباحثين في رحلتهم الأكاديمية</p>
          </div>
          <AcademicServicesSection limit={3} />
          <div className="section-footer">
            <a href="#/services" className="view-all-btn">
              عرض جميع الخدمات
            </a>
          </div>
        </div>
      </section>

      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;

