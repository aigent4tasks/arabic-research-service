import React, { useState, useEffect } from 'react';
import { getAllBooks, getFreeBooks, getPaidBooks } from '../../services/booksService';
import './BooksSection.css';

const BooksSection = ({ type = 'all', limit = null }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooks();
  }, [type]);

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    
    try {
      let result;
      
      switch (type) {
        case 'free':
          result = await getFreeBooks();
          break;
        case 'paid':
          result = await getPaidBooks();
          break;
        default:
          result = await getAllBooks();
      }

      if (result.success) {
        let booksData = result.data;
        if (limit) {
          booksData = booksData.slice(0, limit);
        }
        setBooks(booksData);
      } else {
        setError(result.error || 'خطأ في تحميل الكتب');
      }
    } catch (err) {
      setError('خطأ في الاتصال بقاعدة البيانات');
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="books-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>جاري تحميل الكتب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-section">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={loadBooks} className="retry-btn">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="books-section">
        <div className="no-books-message">
          <p>📚 لا توجد كتب متاحة حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="books-section">
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            {book.coverImage && (
              <div className="book-cover">
                <img src={book.coverImage} alt={book.title} />
              </div>
            )}
            
            <div className="book-content">
              <h3 className="book-title">{book.title}</h3>
              
              {book.category && (
                <span className="book-category">{book.category}</span>
              )}
              
              <p className="book-description">{book.description}</p>
              
              <div className="book-footer">
                <div className="book-price">
                  {book.isFree ? (
                    <span className="free-badge">مجاني</span>
                  ) : (
                    <span className="price-badge">${book.price}</span>
                  )}
                </div>
                
                <div className="book-actions">
                  <a 
                    href={book.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`book-btn ${book.isFree ? 'download-btn' : 'preview-btn'}`}
                  >
                    {book.isFree ? '📥 تحميل' : '👁️ معاينة'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksSection;

