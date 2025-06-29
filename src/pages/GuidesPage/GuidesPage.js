import React from 'react';
import BooksSection from '../../components/books/BooksSection';
import './GuidesPage.css';

function GuidesPage() {
  return (
    <div className="guides-page">
      <div className="container">
        <div className="guides-header">
          <h1>الأدلة والكتب الإرشادية</h1>
          <p>مجموعة شاملة من الأدلة والكتب التي تساعد الباحثين في رحلتهم الأكاديمية</p>
        </div>

        <div className="guides-section">
          <h2>الكتب المجانية</h2>
          <BooksSection type="free" />
        </div>

        <div className="guides-section">
          <h2>الكتب المدفوعة</h2>
          <BooksSection type="paid" />
        </div>
      </div>
    </div>
  );
}

export default GuidesPage;

