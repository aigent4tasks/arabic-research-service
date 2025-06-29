import React, { useState, useEffect } from 'react';
import { getAllMotivationalArticles } from '../../services/motivationalArticlesService';
import './MotivationalArticlesSection.css';

const MotivationalArticlesSection = ({ limit = null }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await getAllMotivationalArticles();

      if (result.success) {
        let articlesData = result.data;
        if (limit) {
          articlesData = articlesData.slice(0, limit);
        }
        setArticles(articlesData);
      } else {
        setError(result.error || 'خطأ في تحميل المقالات');
      }
    } catch (err) {
      setError('خطأ في الاتصال بقاعدة البيانات');
    }
    
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    // Remove HTML tags for preview
    const textContent = content.replace(/<[^>]*>/g, '');
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="motivational-articles-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>جاري تحميل المقالات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="motivational-articles-section">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={loadArticles} className="retry-btn">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="motivational-articles-section">
        <div className="no-articles-message">
          <p>💡 لا توجد مقالات تحفيزية متاحة حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="motivational-articles-section">
      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            {article.image && (
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
            )}
            
            <div className="article-content">
              <div className="article-header">
                <h3 className="article-title">{article.title}</h3>
                <div className="article-meta">
                  <span className="article-date">{formatDate(article.createdAt)}</span>
                </div>
              </div>
              
              <div className="article-body">
                <p className="article-excerpt">
                  {truncateContent(article.content)}
                </p>
              </div>
              
              <div className="article-footer">
                <button className="read-more-btn">
                  قراءة المقال كاملاً
                </button>
                
                {article.ctaText && article.ctaLink && (
                  <a 
                    href={article.ctaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    {article.ctaText}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MotivationalArticlesSection;

