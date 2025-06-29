import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

// Firebase services
import { 
  getAllBooks, 
  addBook, 
  updateBook, 
  deleteBook 
} from '../../services/booksService';
import { 
  getAllBlogPosts, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from '../../services/blogPostsService';
import { 
  getAllMotivationalArticles, 
  addMotivationalArticle, 
  updateMotivationalArticle, 
  deleteMotivationalArticle 
} from '../../services/motivationalArticlesService';

const DashboardPage = () => {
  // States for different content types
  const [books, setBooks] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [motivationalArticles, setMotivationalArticles] = useState([]);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('books');
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [booksResult, blogPostsResult, articlesResult] = await Promise.all([
        getAllBooks(),
        getAllBlogPosts(),
        getAllMotivationalArticles()
      ]);

      if (booksResult.success) setBooks(booksResult.data);
      if (blogPostsResult.success) setBlogPosts(blogPostsResult.data);
      if (articlesResult.success) setMotivationalArticles(articlesResult.data);
    } catch (err) {
      setError('خطأ في تحميل البيانات');
    }
    setLoading(false);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      
      if (activeTab === 'books') {
        const bookData = {
          ...formData,
          price: parseFloat(formData.price) || 0
        };
        
        if (editingItem) {
          result = await updateBook(editingItem.id, bookData);
        } else {
          result = await addBook(bookData);
        }
      } else if (activeTab === 'blogPosts') {
        if (editingItem) {
          result = await updateBlogPost(editingItem.id, formData);
        } else {
          result = await addBlogPost(formData);
        }
      } else if (activeTab === 'motivationalArticles') {
        if (editingItem) {
          result = await updateMotivationalArticle(editingItem.id, formData);
        } else {
          result = await addMotivationalArticle(formData);
        }
      }

      if (result.success) {
        setSuccess(editingItem ? 'تم التحديث بنجاح' : 'تم الإضافة بنجاح');
        resetForm();
        loadAllData();
      } else {
        setError(result.error || 'حدث خطأ');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    
    setLoading(true);
    try {
      let result;
      
      if (activeTab === 'books') {
        result = await deleteBook(id);
      } else if (activeTab === 'blogPosts') {
        result = await deleteBlogPost(id);
      } else if (activeTab === 'motivationalArticles') {
        result = await deleteMotivationalArticle(id);
      }

      if (result.success) {
        setSuccess('تم الحذف بنجاح');
        loadAllData();
      } else {
        setError(result.error || 'حدث خطأ في الحذف');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    }
    setLoading(false);
  };

  // Render form based on active tab
  const renderForm = () => {
    if (activeTab === 'books') {
      return (
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-group">
            <label>عنوان الكتاب</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>وصف الكتاب</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>رابط صورة الغلاف</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>رابط الملف</label>
            <input
              type="url"
              name="fileUrl"
              value={formData.fileUrl || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>التصنيف</label>
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree || false}
                onChange={handleInputChange}
              />
              كتاب مجاني
            </label>
          </div>
          
          {!formData.isFree && (
            <div className="form-group">
              <label>السعر</label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
          )}
          
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {editingItem ? 'تحديث' : 'إضافة'}
            </button>
            <button type="button" onClick={resetForm}>
              إلغاء
            </button>
          </div>
        </form>
      );
    } else if (activeTab === 'blogPosts') {
      return (
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-group">
            <label>عنوان التدوينة</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>محتوى التدوينة</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleInputChange}
              rows="10"
              required
            />
          </div>
          
          <div className="form-group">
            <label>العلامات (مفصولة بفواصل)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags ? formData.tags.join(', ') : ''}
              onChange={handleTagsChange}
              placeholder="مثال: تحكيم, نشر, باحث مبتدئ"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {editingItem ? 'تحديث' : 'إضافة'}
            </button>
            <button type="button" onClick={resetForm}>
              إلغاء
            </button>
          </div>
        </form>
      );
    } else if (activeTab === 'motivationalArticles') {
      return (
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-group">
            <label>عنوان المقال</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>محتوى المقال</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleInputChange}
              rows="10"
              required
            />
          </div>
          
          <div className="form-group">
            <label>رابط الصورة (اختياري)</label>
            <input
              type="url"
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>نص زر الدعوة للعمل</label>
            <input
              type="text"
              name="ctaText"
              value={formData.ctaText || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>رابط زر الدعوة للعمل</label>
            <input
              type="url"
              name="ctaLink"
              value={formData.ctaLink || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {editingItem ? 'تحديث' : 'إضافة'}
            </button>
            <button type="button" onClick={resetForm}>
              إلغاء
            </button>
          </div>
        </form>
      );
    }
  };

  // Render data table based on active tab
  const renderDataTable = () => {
    let data = [];
    if (activeTab === 'books') data = books;
    else if (activeTab === 'blogPosts') data = blogPosts;
    else if (activeTab === 'motivationalArticles') data = motivationalArticles;

    return (
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>العنوان</th>
              {activeTab === 'books' && <th>النوع</th>}
              {activeTab === 'books' && <th>السعر</th>}
              {activeTab === 'blogPosts' && <th>العلامات</th>}
              <th>تاريخ الإنشاء</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                {activeTab === 'books' && (
                  <td>{item.isFree ? 'مجاني' : 'مدفوع'}</td>
                )}
                {activeTab === 'books' && (
                  <td>{item.isFree ? '-' : `$${item.price}`}</td>
                )}
                {activeTab === 'blogPosts' && (
                  <td>{item.tags ? item.tags.join(', ') : '-'}</td>
                )}
                <td>{new Date(item.createdAt).toLocaleDateString('ar-SA')}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(item)}
                    className="edit-btn"
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>لوحة التحكم</h1>
        
        {/* Notifications */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        {/* Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'books' ? 'active' : ''}
            onClick={() => setActiveTab('books')}
          >
            الكتب ({books.length})
          </button>
          <button 
            className={activeTab === 'blogPosts' ? 'active' : ''}
            onClick={() => setActiveTab('blogPosts')}
          >
            التدوينات العلمية ({blogPosts.length})
          </button>
          <button 
            className={activeTab === 'motivationalArticles' ? 'active' : ''}
            onClick={() => setActiveTab('motivationalArticles')}
          >
            المقالات التحفيزية ({motivationalArticles.length})
          </button>
        </div>
        
        {/* Add button */}
        <div className="dashboard-actions">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-btn"
          >
            {showAddForm ? 'إخفاء النموذج' : 'إضافة جديد'}
          </button>
        </div>
        
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="form-section">
            <h3>{editingItem ? 'تعديل' : 'إضافة جديد'}</h3>
            {renderForm()}
          </div>
        )}
        
        {/* Data Table */}
        <div className="table-section">
          <h3>
            {activeTab === 'books' && 'الكتب'}
            {activeTab === 'blogPosts' && 'التدوينات العلمية'}
            {activeTab === 'motivationalArticles' && 'المقالات التحفيزية'}
          </h3>
          {loading ? (
            <div className="loading">جاري التحميل...</div>
          ) : (
            renderDataTable()
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

