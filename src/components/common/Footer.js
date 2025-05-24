import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>خدمة الباحث الأكاديمي</h2>
            <p>منصة متخصصة في تقديم الخدمات الأكاديمية للباحثين العرب</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3>روابط سريعة</h3>
              <ul>
                <li><Link to="/">الرئيسية</Link></li>
                <li><Link to="/services">خدماتنا</Link></li>
                <li><Link to="/guides">الأدلة الأكاديمية</Link></li>
                <li><Link to="/blog">المدونة</Link></li>
                <li><Link to="/about">من نحن</Link></li>
                <li><Link to="/contact">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>خدماتنا</h3>
              <ul>
                <li><Link to="/services">الاستشارات البحثية</Link></li>
                <li><Link to="/services">تصميم منهجية البحث</Link></li>
                <li><Link to="/services">المراجعة اللغوية</Link></li>
                <li><Link to="/services">التحليل الإحصائي</Link></li>
                <li><Link to="/services">النشر العلمي</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>تواصل معنا</h3>
              <ul className="contact-info">
                <li>البريد الإلكتروني: info@ars-academic.com</li>
                <li>الهاتف: 4567 123 50 966+</li>
                <li>العنوان: الرياض، المملكة العربية السعودية</li>
              </ul>
              
              <div className="social-links">
                <a href="#" className="social-link">فيسبوك</a>
                <a href="#" className="social-link">تويتر</a>
                <a href="#" className="social-link">لينكد إن</a>
                <a href="#" className="social-link">انستغرام</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} خدمة الباحث الأكاديمي</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
