import React from 'react';
import './TestimonialsSection.css';

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "د. محمد العمري",
      position: "أستاذ مساعد - جامعة الملك سعود",
      text: "استفدت كثيراً من خدمات المنصة في تحليل البيانات الإحصائية لبحثي. الفريق محترف ودقيق في العمل، وساعدني في نشر بحثي في مجلة علمية مرموقة."
    },
    {
      id: 2,
      name: "سارة الأحمد",
      position: "طالبة دكتوراه - جامعة الإمام",
      text: "الاستشارات البحثية التي قدمها فريق خدمة الباحث الأكاديمي ساعدتني في تحديد مسار بحثي وتجنب الكثير من العقبات. أنصح بشدة بالتعامل معهم."
    },
    {
      id: 3,
      name: "د. خالد المنصور",
      position: "باحث - مركز الدراسات الاستراتيجية",
      text: "المراجعة اللغوية كانت دقيقة جداً وساعدتني في تحسين أسلوب الكتابة. أشكر فريق خدمة الباحث الأكاديمي على الاحترافية العالية."
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>آراء المستفيدين</h2>
          <p>نفخر بثقة الباحثين والأكاديميين في خدماتنا</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-text">
                <p>"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
