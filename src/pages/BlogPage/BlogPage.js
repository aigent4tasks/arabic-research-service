import React from 'react';
import BlogPostsSection from '../../components/blog/BlogPostsSection';
import './BlogPage.css';

function BlogPage() {
  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>المدونة العلمية</h1>
          <p>مقالات وتدوينات علمية تساعد الباحثين في رحلتهم الأكاديمية</p>
        </div>

        <div className="blog-content">
          <BlogPostsSection />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

