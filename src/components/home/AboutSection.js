import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>من نحن</h2>
            <p>خدمة الباحث الأكاديمي هي منصة متخصصة في تقديم الخدمات الأكاديمية للباحثين العرب في مختلف المجالات والتخصصات. تأسست المنصة بهدف تقديم الدعم العلمي والمنهجي للباحثين وطلاب الدراسات العليا.</p>
            <p>يضم فريقنا نخبة من الأساتذة والخبراء الأكاديميين المتخصصين في مختلف المجالات، ممن يمتلكون خبرة واسعة في البحث العلمي والنشر الأكاديمي.</p>
            <a href="/about" className="btn btn-primary">المزيد عنا</a>
          </div>
          <div className="about-image">
            <div className="image-placeholder">صورة توضيحية</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
