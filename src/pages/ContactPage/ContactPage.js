import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>اتصل بنا</h1>
        <p>نحن هنا للإجابة على استفساراتك وتقديم المساعدة التي تحتاجها</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>معلومات الاتصال</h2>
          
          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-content">
              <h3>البريد الإلكتروني</h3>
              <p>info@ars-academic.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">📱</div>
            <div className="info-content">
              <h3>الهاتف</h3>
              <p>+966 50 123 4567</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">🕒</div>
            <div className="info-content">
              <h3>ساعات العمل</h3>
              <p>الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً</p>
              <p>الجمعة - السبت: مغلق</p>
            </div>
          </div>
          
          <div className="social-media">
            <h3>تابعنا على</h3>
            <div className="social-links">
              <a href="#" className="social-link">فيسبوك</a>
              <a href="#" className="social-link">تويتر</a>
              <a href="#" className="social-link">لينكد إن</a>
              <a href="#" className="social-link">انستغرام</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>أرسل رسالة</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">الاسم الكامل</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">رقم الهاتف</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">الموضوع</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">الرسالة</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">إرسال الرسالة</button>
          </form>
        </div>
      </div>
      
      <div className="faq-section">
        <h2>الأسئلة الشائعة</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3>كيف يمكنني طلب خدمة من المنصة؟</h3>
            <p>يمكنك طلب الخدمة من خلال صفحة الخدمات، اختر الخدمة المطلوبة ثم اضغط على زر "طلب الخدمة" وقم بتعبئة النموذج المطلوب.</p>
          </div>
          
          <div className="faq-item">
            <h3>ما هي طرق الدفع المتاحة؟</h3>
            <p>نوفر عدة طرق للدفع تشمل: البطاقات الائتمانية، حوالة بنكية، مدى، آبل باي، وسداد.</p>
          </div>
          
          <div className="faq-item">
            <h3>كم تستغرق الخدمة من الوقت؟</h3>
            <p>تختلف مدة تنفيذ الخدمة حسب نوعها وحجم العمل المطلوب. سيتم تحديد المدة المتوقعة بعد دراسة طلبك وقبل البدء في تنفيذ الخدمة.</p>
          </div>
          
          <div className="faq-item">
            <h3>هل يمكنني طلب تعديلات على الخدمة بعد استلامها؟</h3>
            <p>نعم، نوفر خدمة التعديلات المجانية لمدة أسبوعين من تاريخ تسليم الخدمة، وذلك ضمن نطاق العمل المتفق عليه.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
