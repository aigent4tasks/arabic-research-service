import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>من نحن</h1>
        <p>تعرف على خدمة الباحث الأكاديمي ورسالتنا وفريقنا</p>
      </div>
      
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>نبذة عن خدمة الباحث الأكاديمي</h2>
            <p>خدمة الباحث الأكاديمي هي منصة متخصصة في تقديم الخدمات الأكاديمية للباحثين العرب في مختلف المجالات والتخصصات. تأسست المنصة في عام 2020 بهدف تقديم الدعم العلمي والمنهجي للباحثين وطلاب الدراسات العليا، وتذليل العقبات التي تواجههم في رحلتهم البحثية.</p>
            
            <p>نؤمن في خدمة الباحث الأكاديمي بأن البحث العلمي هو أساس التقدم والتنمية، ونسعى إلى المساهمة في تطوير البحث العلمي في العالم العربي من خلال تقديم خدمات احترافية ذات جودة عالية تلبي احتياجات الباحثين وتساعدهم على تحقيق أهدافهم الأكاديمية.</p>
          </div>
        </div>
      </section>
      
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h2>رسالتنا</h2>
              <p>تقديم خدمات أكاديمية متميزة للباحثين العرب تسهم في تطوير قدراتهم البحثية وتمكينهم من إنتاج بحوث علمية ذات جودة عالية تضيف للمعرفة وتسهم في حل مشكلات المجتمع.</p>
            </div>
            
            <div className="vision-card">
              <h2>رؤيتنا</h2>
              <p>أن نكون المنصة الرائدة في تقديم الخدمات الأكاديمية للباحثين العرب، وأن نسهم في بناء مجتمع معرفي عربي قادر على المنافسة عالمياً في مجال البحث العلمي.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="values-section">
        <div className="container">
          <h2>قيمنا</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>الجودة</h3>
              <p>نلتزم بتقديم خدمات ذات جودة عالية تلبي المعايير الأكاديمية العالمية وتحقق رضا المستفيدين.</p>
            </div>
            
            <div className="value-card">
              <h3>المصداقية</h3>
              <p>نعمل بشفافية ونزاهة في جميع تعاملاتنا، ونلتزم بالمواعيد المحددة وبالوعود التي نقطعها على أنفسنا.</p>
            </div>
            
            <div className="value-card">
              <h3>الاحترافية</h3>
              <p>نتبنى أعلى معايير الاحترافية في تقديم خدماتنا، ونحرص على التطوير المستمر لمهارات فريقنا.</p>
            </div>
            
            <div className="value-card">
              <h3>الإبداع</h3>
              <p>نشجع التفكير الإبداعي والابتكار في حل المشكلات البحثية وتطوير الخدمات التي نقدمها.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <h2>فريقنا</h2>
          <p className="team-intro">يضم فريقنا نخبة من الأساتذة والخبراء الأكاديميين المتخصصين في مختلف المجالات، ممن يمتلكون خبرة واسعة في البحث العلمي والنشر الأكاديمي.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>د. أحمد الشمري</h3>
              <p className="member-position">المدير التنفيذي</p>
              <p className="member-bio">دكتوراه في المناهج وطرق التدريس، خبرة أكثر من 15 عاماً في البحث العلمي والإشراف على الرسائل العلمية.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>د. سارة العتيبي</h3>
              <p className="member-position">مستشارة أكاديمية</p>
              <p className="member-bio">دكتوراه في علم النفس التربوي، متخصصة في تصميم البحوث التربوية والنفسية والتحليل الإحصائي.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>د. خالد المنصور</h3>
              <p className="member-position">مستشار النشر العلمي</p>
              <p className="member-bio">دكتوراه في إدارة الأعمال، خبير في النشر العلمي في المجلات المصنفة عالمياً، ومحكم في عدة مجلات علمية.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>د. منى الزهراني</h3>
              <p className="member-position">خبيرة التحليل الإحصائي</p>
              <p className="member-bio">دكتوراه في الإحصاء التطبيقي، متخصصة في تحليل البيانات البحثية باستخدام البرامج الإحصائية المختلفة.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <h2>إنجازاتنا بالأرقام</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">+500</div>
              <div className="stat-label">باحث استفاد من خدماتنا</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">+200</div>
              <div className="stat-label">بحث تم نشره في مجلات علمية</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">+100</div>
              <div className="stat-label">رسالة ماجستير ودكتوراه</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">+50</div>
              <div className="stat-label">ورشة عمل ودورة تدريبية</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="container">
          <h2>آراء المستفيدين</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-text">
                <p>"استفدت كثيراً من خدمات المنصة في تحليل البيانات الإحصائية لبحثي. الفريق محترف ودقيق في العمل، وساعدني في نشر بحثي في مجلة علمية مرموقة."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>د. محمد العمري</h4>
                  <p>أستاذ مساعد - جامعة الملك سعود</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-text">
                <p>"الاستشارات البحثية التي قدمها فريق خدمة الباحث الأكاديمي ساعدتني في تحديد مسار بحثي وتجنب الكثير من العقبات. أنصح بشدة بالتعامل معهم."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>سارة الأحمد</h4>
                  <p>طالبة دكتوراه - جامعة الإمام</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
