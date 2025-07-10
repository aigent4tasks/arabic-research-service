import React, { useState, useEffect } from 'react';
import { getActiveAcademicServices, getCategoryColor, formatServiceForDisplay } from '../../services/academicServicesService';
import './AcademicServicesSection.css';

const AcademicServicesSection = ({ limit = null }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const result = await getActiveAcademicServices();
      
      if (result.success) {
        let servicesData = result.data.map(formatServiceForDisplay);
        
        // تطبيق الحد الأقصى إذا تم تحديده
        if (limit) {
          servicesData = servicesData.slice(0, limit);
        }
        
        setServices(servicesData);
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

  const handleServiceClick = (service) => {
    // يمكن إضافة منطق لفتح تفاصيل الخدمة أو التواصل
    if (service.contact_info) {
      // استخراج رقم الواتساب إذا كان موجوداً
      const whatsappMatch = service.contact_info.match(/\+966\d{9}/);
      if (whatsappMatch) {
        const phoneNumber = whatsappMatch[0];
        const message = `مرحباً، أرغب في الاستفسار عن خدمة: ${service.title}`;
        const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        return;
      }
      
      // استخراج البريد الإلكتروني إذا كان موجوداً
      const emailMatch = service.contact_info.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        const email = emailMatch[0];
        const subject = `استفسار عن خدمة: ${service.title}`;
        const body = `مرحباً،\n\nأرغب في الاستفسار عن خدمة "${service.title}".\n\nشكراً لكم.`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return;
      }
    }
    
    // إذا لم توجد معلومات تواصل محددة، عرض رسالة
    alert('للاستفسار عن هذه الخدمة، يرجى التواصل معنا عبر صفحة "اتصل بنا"');
  };

  if (loading) {
    return (
      <div className="academic-services-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>جاري تحميل الخدمات الأكاديمية...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="academic-services-section">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={loadServices} className="retry-btn">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="academic-services-section">
        <div className="no-services">
          <p>لا توجد خدمات أكاديمية متاحة حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="academic-services-section">
      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card"
            onClick={() => handleServiceClick(service)}
          >
            {service.image && (
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
            )}
            
            <div className="service-content">
              <div className="service-header">
                <h3 className="service-title">{service.title}</h3>
                <span 
                  className="service-category"
                  style={{ backgroundColor: getCategoryColor(service.category) }}
                >
                  {service.categoryDisplay}
                </span>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              {service.features && service.features.length > 0 && (
                <div className="service-features">
                  <h4>الميزات:</h4>
                  <ul>
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="more-features">
                        +{service.features.length - 3} ميزة أخرى
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className="service-footer">
                <div className="service-price">
                  <span className="price-label">السعر:</span>
                  <span className="price-value">{service.formattedPrice}</span>
                </div>
                
                {service.duration_days && (
                  <div className="service-duration">
                    <span className="duration-label">المدة:</span>
                    <span className="duration-value">{service.formattedDuration}</span>
                  </div>
                )}
                
                <button className="contact-btn">
                  طلب الخدمة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicServicesSection;

