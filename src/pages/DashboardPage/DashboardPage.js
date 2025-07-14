import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

// Supabase services
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
  getAllAcademicServices, 
  addAcademicService, 
  updateAcademicService, 
  deleteAcademicService 
} from '../../services/academicServicesService';
import { adminLogout, getCurrentUser } from '../../services/supabase/authService';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  // States for different content types
  const [books, setBooks] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [academicServices, setAcademicServices] = useState([]);
  
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
  
  // User state
  const [currentUser, setCurrentUser] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadUserData();
    loadAllData();
  }, []);

  const loadUserData = async () => {
    const result = await getCurrentUser();
    if (result.success) {
      setCurrentUser(result.adminData);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [booksResult, blogPostsResult, academicServicesResult] = await Promise.all([
        getAllBooks(),
        getAllBlogPosts(),
        getAllAcademicServices()
      ]);

      if (booksResult.success) setBooks(booksResult.data);
      if (blogPostsResult.success) setBlogPosts(blogPostsResult.data);
      if (academicServicesResult.success) setAcademicServices(academicServicesResult.data);
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

  const handleFeaturesChange = (e) => {
    const features = e.target.value.split(',').map(feature => feature.trim()).filter(feature => feature);
    setFormData(prev => ({ ...prev, features }));
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
      } else if (activeTab === 'academicServices') {
        const serviceData = {
          ...formData,
          price: parseFloat(formData.price) || 0,
          durationDays: parseInt(formData.durationDays) || null
        };
        
        if (editingItem) {
          result = await updateAcademicService(editingItem.id, serviceData);
        } else {
          result = await addAcademicService(serviceData);
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
    
    // تحويل البيانات للنموذج
    if (activeTab === 'academicServices') {
      setFormData({
        ...item,
        durationDays: item.duration_days,
        detailedDescription: item.detailed_description,
        isActive: item.is_active,
        contactInfo: item.contact_info
      });
    } else {
      setFormData(item);
    }
    
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
      } else if (activeTab === 'academicServices') {
        result = await deleteAcademicService(id);
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
    } else if (activeTab === 'academicServices') {
      return (
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-group">
            <label>عنوان الخدمة</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>وصف مختصر</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label>وصف تفصيلي</label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription || ''}
              onChange={handleInputChange}
              rows="5"
            />
          </div>
          
          <div className="form-group">
            <label>التصنيف</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">اختر التصنيف</option>
              <option value="استشارات">الاستشارات البحثية</option>
              <option value="تحليل إحصائي">التحليل الإحصائي</option>
              <option value="مراجعة لغوية">المراجعة اللغوية</option>
              <option value="كتابة أكاديمية">الكتابة الأكاديمية</option>
              <option value="ترجمة">خدمات الترجمة</option>
              <option value="تصميم">التصميم والإخراج</option>
              <option value="أخرى">خدمات أخرى</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>السعر (ريال)</label>
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>مدة التنفيذ (بالأيام)</label>
            <input
              type="number"
              name="durationDays"
              value={formData.durationDays || ''}
              onChange={handleInputChange}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>الميزات (مفصولة بفواصل)</label>
            <input
              type="text"
              name="features"
              value={formData.features ? formData.features.join(', ') : ''}
              onChange={handleFeaturesChange}
              placeholder="مثال: استشارة مجانية, مراجعة مجانية, ضمان الجودة"
            />
          </div>
          
          <div className="form-group">
            <label>المتطلبات</label>
            <textarea
              name="requirements"
              value={formData.requirements || ''}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>المخرجات</label>
            <textarea
              name="deliverables"
              value={formData.deliverables || ''}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>رابط الصورة</label>
            <input
              type="url"
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>معلومات التواصل</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive !== undefined ? formData.isActive : true}
                onChange={handleInputChange}
              />
              خدمة نشطة
            </label>
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
    else if (activeTab === 'academicServices') data = academicServices;

    return (
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>العنوان</th>
              {activeTab === 'books' && <th>النوع</th>}
              {activeTab === 'books' && <th>السعر</th>}
              {activeTab === 'blogPosts' && <th>العلامات</th>}
              {activeTab === 'academicServices' && <th>التصنيف</th>}
              {activeTab === 'academicServices' && <th>السعر</th>}
              {activeTab === 'academicServices' && <th>الحالة</th>}
              <th>تاريخ الإنشاء</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                {activeTab === 'books' && (
                  <td>{item.isFree || item.is_free ? 'مجاني' : 'مدفوع'}</td>
                )}
                {activeTab === 'books' && (
                  <td>{item.isFree || item.is_free ? '-' : `${item.price} ريال`}</td>
                )}
                {activeTab === 'blogPosts' && (
                  <td>{item.tags ? item.tags.join(', ') : '-'}</td>
                )}
                {activeTab === 'academicServices' && (
                  <td>{item.category}</td>
                )}
                {activeTab === 'academicServices' && (
                  <td>{item.price} ريال</td>
                )}
                {activeTab === 'academicServices' && (
                  <td>{item.is_active ? 'نشط' : 'غير نشط'}</td>
                )}
                <td>{new Date(item.created_at || item.createdAt).toLocaleDateString('ar-SA')}</td>
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

  const handleLogout = async () => {
    const result = await adminLogout();
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>لوحة التحكم</h1>
          {currentUser && (
            <div className="user-info">
              <span>مرحباً، {currentUser.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
        
        {/* Notifications */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        {/* Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'books' ? 'active' : ''}
            onClick={() => setActiveTab('books')}
          >
            الكتب والحزم ({books.length})
          </button>
          <button 
            className={activeTab === 'blogPosts' ? 'active' : ''}
            onClick={() => setActiveTab('blogPosts')}
          >
            التدوينات العلمية ({blogPosts.length})
          </button>
          <button 
            className={activeTab === 'academicServices' ? 'active' : ''}
            onClick={() => setActiveTab('academicServices')}
          >
            الخدمات البحثية ({academicServices.length})
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
            {activeTab === 'books' && 'الكتب والحزم'}
            {activeTab === 'blogPosts' && 'التدوينات العلمية'}
            {activeTab === 'academicServices' && 'الخدمات البحثية'}
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

