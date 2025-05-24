import React from 'react';
import './FeaturedServices.css';
import ServiceCard from '../common/ServiceCard';

function FeaturedServices() {
  const services = [
    {
      id: 1,
      title: 'الاستشارات البحثية',
      description: 'نقدم استشارات بحثية متخصصة تساعد الباحثين في تحديد مسار بحثهم وتطوير أفكارهم البحثية.',
      icon: '📝'
    },
    {
      id: 2,
      title: 'التحليل الإحصائي',
      description: 'خدمات التحليل الإحصائي للبيانات البحثية باستخدام البرامج الإحصائية المتخصصة.',
      icon: '📊'
    },
    {
      id: 3,
      title: 'المراجعة اللغوية',
      description: 'مراجعة لغوية شاملة للأبحاث والرسائل العلمية باللغتين العربية والإنجليزية.',
      icon: '📖'
    }
  ];

  return (
    <section className="featured-services-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2>خدماتنا المميزة</h2>
          <p>نقدم مجموعة متنوعة من الخدمات الأكاديمية لمساعدة الباحثين في مختلف مراحل البحث العلمي</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        
        <div className="view-all-services">
          <a href="/services" className="btn btn-secondary">عرض جميع الخدمات</a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;
