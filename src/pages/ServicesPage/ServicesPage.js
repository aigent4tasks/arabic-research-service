import React, { useState, useEffect } from 'react';
import { 
  getAllAcademicServices, 
  getServiceCategories, 
  searchAcademicServices,
  filterServices,
  sortServices,
  getAvailableCategories,
  formatServiceForDisplay 
} from '../../services/academicServicesService';
import AcademicServicesSection from '../../components/academic/AcademicServicesSection';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const availableCategories = getAvailableCategories();

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [services, searchTerm, selectedCategory, sortBy, sortOrder, priceRange]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const result = await getAllAcademicServices();
      
      if (result.success) {
        const formattedServices = result.data.map(formatServiceForDisplay);
        setServices(formattedServices);
        setError(null);
      } else {
        setError(result.error || 'فشل في تحميل الخدمات الأكاديمية');
      }
    } catch (err) {
      console.error('خطأ في تحميل الخدمات:', err);
      setError('حدث خطأ أثناء تحميل الخدمات');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...services];

    // تطبيق البحث
    if (searchTerm.trim()) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تطبيق فلترة التصنيف
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // تطبيق فلترة السعر
    const filters = {};
    if (priceRange.min !== '') {
      filters.minPrice = parseFloat(priceRange.min);
    }
    if (priceRange.max !== '') {
      filters.maxPrice = parseFloat(priceRange.max);
    }
    
    if (Object.keys(filters).length > 0) {
      filtered = filterServices(filtered, filters);
    }

    // تطبيق الترتيب
    filtered = sortServices(filtered, sortBy, sortOrder);

    setFilteredServices(filtered);
  };

  const handleSearch = async (term) => {
    if (term.trim()) {
      try {
        const result = await searchAcademicServices(term);
        if (result.success) {
          const formattedServices = result.data.map(formatServiceForDisplay);
          setServices(formattedServices);
        }
      } catch (err) {
        console.error('خطأ في البحث:', err);
      }
    } else {
      loadServices();
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('created_at');
    setSortOrder('desc');
    setPriceRange({ min: '', max: '' });
    loadServices();
  };

  if (loading) {
    return (
      <div className="services-page">
        <div className="container">
          <div className="page-header">
            <h1>خدماتنا الأكاديمية</h1>
            <p>خدمات متخصصة لدعم الباحثين في جميع مراحل البحث العلمي</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>جاري تحميل الخدمات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <div className="container">
          <div className="page-header">
            <h1>خدماتنا الأكاديمية</h1>
            <p>خدمات متخصصة لدعم الباحثين في جميع مراحل البحث العلمي</p>
          </div>
          <div className="error-container">
            <div className="error-message">
              <p>⚠️ {error}</p>
              <button onClick={loadServices} className="retry-btn">
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>خدماتنا الأكاديمية</h1>
          <p>خدمات متخصصة لدعم الباحثين في جميع مراحل البحث العلمي</p>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="ابحث في الخدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
            />
            <button 
              onClick={() => handleSearch(searchTerm)}
              className="search-btn"
            >
              بحث
            </button>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>التصنيف:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">جميع التصنيفات</option>
                {availableCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>ترتيب حسب:</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="created_at-desc">الأحدث أولاً</option>
                <option value="created_at-asc">الأقدم أولاً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="title-asc">الاسم: أ-ي</option>
                <option value="title-desc">الاسم: ي-أ</option>
              </select>
            </div>

            <div className="filter-group price-range">
              <label>نطاق السعر:</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="من"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="إلى"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>

            <button onClick={resetFilters} className="reset-filters-btn">
              إعادة تعيين
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            عرض {filteredServices.length} من أصل {services.length} خدمة
            {selectedCategory && (
              <span className="active-filter">
                في تصنيف: {availableCategories.find(cat => cat.value === selectedCategory)?.label}
              </span>
            )}
            {searchTerm && (
              <span className="active-filter">
                البحث عن: "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="services-content">
            <div className="services-grid">
              {filteredServices.map((service) => (
                <div key={service.id} className="service-card-wrapper">
                  <AcademicServicesSection services={[service]} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <h3>لا توجد خدمات تطابق معايير البحث</h3>
              <p>جرب تعديل معايير البحث أو الفلترة للحصول على نتائج أفضل</p>
              <button onClick={resetFilters} className="reset-btn">
                عرض جميع الخدمات
              </button>
            </div>
          </div>
        )}

        {/* Categories Overview */}
        <div className="categories-overview">
          <h2>تصنيفات الخدمات</h2>
          <div className="categories-grid">
            {availableCategories.map(category => {
              const categoryServices = services.filter(s => s.category === category.value);
              return (
                <div 
                  key={category.value} 
                  className="category-card"
                  onClick={() => setSelectedCategory(category.value)}
                  style={{ borderColor: category.color }}
                >
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.label.charAt(0)}
                  </div>
                  <h3>{category.label}</h3>
                  <p>{categoryServices.length} خدمة متاحة</p>
                  {categoryServices.length > 0 && (
                    <p className="price-range">
                      من {Math.min(...categoryServices.map(s => s.price))} 
                      إلى {Math.max(...categoryServices.map(s => s.price))} ريال
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

