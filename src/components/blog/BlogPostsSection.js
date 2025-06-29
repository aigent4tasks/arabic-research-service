import React, { useState, useEffect } from 'react';
import { getAllBlogPosts, getBlogPostsByTag } from '../../services/blogPostsService';
import './BlogPostsSection.css';

const BlogPostsSection = ({ tag = null, limit = null }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, [tag]);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    
    try {
      let result;
      
      if (tag) {
        result = await getBlogPostsByTag(tag);
      } else {
        result = await getAllBlogPosts();
      }

      if (result.success) {
        let postsData = result.data;
        if (limit) {
          postsData = postsData.slice(0, limit);
        }
        setPosts(postsData);
      } else {
        setError(result.error || 'خطأ في تحميل التدوينات');
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

  const truncateContent = (content, maxLength = 200) => {
    // Remove HTML tags for preview
    const textContent = content.replace(/<[^>]*>/g, '');
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="blog-posts-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>جاري تحميل التدوينات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-posts-section">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={loadPosts} className="retry-btn">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="blog-posts-section">
        <div className="no-posts-message">
          <p>📝 لا توجد تدوينات متاحة حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-posts-section">
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <div className="post-meta">
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>
            
            <div className="post-content">
              <p className="post-excerpt">
                {truncateContent(post.content)}
              </p>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="post-footer">
              <button className="read-more-btn">
                قراءة المزيد
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPostsSection;

