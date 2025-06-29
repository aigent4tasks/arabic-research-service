import React from 'react';
import './HomePage.css';
import Hero from '../../components/home/Hero';
import FeaturedServices from '../../components/home/FeaturedServices';
import AboutSection from '../../components/home/AboutSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import BooksSection from '../../components/books/BooksSection';
import BlogPostsSection from '../../components/blog/BlogPostsSection';
import MotivationalArticlesSection from '../../components/motivational/MotivationalArticlesSection';

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

      {/* Motivational Articles Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>مقالات تحفيزية</h2>
            <p>مقالات ملهمة لتحفيز الباحثين وتطوير مهاراتهم</p>
          </div>
          <MotivationalArticlesSection limit={3} />
        </div>
      </section>

      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
