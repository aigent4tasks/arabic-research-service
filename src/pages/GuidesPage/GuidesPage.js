import React from 'react';
import './GuidesPage.css';

function GuidesPage() {
  const freeGuides = [
    {
      id: 1,
      title: 'دليل صياغة أسئلة البحث وفرضياته',
      description: 'دليل شامل يساعد الباحثين في صياغة أسئلة بحثية وفرضيات دقيقة وقابلة للاختبار، مع تقديم أمثلة توضيحية من مختلف التخصصات.',
      contents: [
        'معايير السؤال البحثي الجيد',
        'أنواع الأسئلة البحثية وخصائصها',
        'العلاقة بين أسئلة البحث وأهدافه',
        'كيفية صياغة الفرضيات البحثية',
        'أمثلة تطبيقية من مختلف التخصصات',
        'الأخطاء الشائعة في صياغة الأسئلة والفرضيات'
      ],
      importance: 'يعد تحديد أسئلة البحث وفرضياته من أهم خطوات البحث العلمي، حيث توجه هذه الأسئلة والفرضيات مسار البحث وتحدد منهجيته وأدواته. الدليل يساعد الباحثين في تجنب الأخطاء الشائعة وصياغة أسئلة وفرضيات دقيقة تسهم في نجاح البحث.',
      icon: '📝'
    },
    {
      id: 2,
      title: 'دليل استخدام برنامج SPSS للتحليل الإحصائي',
      description: 'دليل عملي لاستخدام برنامج SPSS في تحليل البيانات البحثية، يشرح الخطوات الأساسية والاختبارات الإحصائية الشائعة بأسلوب مبسط.',
      contents: [
        'واجهة برنامج SPSS وأدواته الرئيسية',
        'إدخال البيانات وترميزها',
        'التحليل الوصفي للبيانات',
        'اختبارات الفروق بين المتوسطات',
        'اختبارات العلاقة والارتباط',
        'تفسير النتائج وعرضها في جداول ورسوم بيانية'
      ],
      importance: 'يعد برنامج SPSS من أكثر البرامج الإحصائية استخداماً في البحوث الاجتماعية والتربوية والنفسية. هذا الدليل يساعد الباحثين في التعامل مع البرنامج بكفاءة وإجراء التحليلات الإحصائية المناسبة لبياناتهم البحثية.',
      icon: '📊'
    }
  ];

  const paidGuides = [
    {
      id: 1,
      title: 'الدليل الشامل لكتابة الرسائل العلمية',
      description: 'دليل متكامل يغطي جميع مراحل إعداد الرسائل العلمية (ماجستير ودكتوراه)، من اختيار الموضوع وحتى مناقشة الرسالة، مع نماذج وأمثلة توضيحية.',
      contents: [
        'اختيار موضوع الرسالة وتحديد مشكلة البحث',
        'إعداد خطة البحث وعرضها على المشرف',
        'كتابة الإطار النظري والدراسات السابقة',
        'تصميم منهجية البحث وأدواته',
        'جمع البيانات وتحليلها وتفسير النتائج',
        'كتابة فصول الرسالة وتنسيقها',
        'الاستعداد لمناقشة الرسالة والرد على أسئلة اللجنة'
      ],
      price: '350 ريال',
      icon: '📚'
    },
    {
      id: 2,
      title: 'دليل النشر في المجلات العلمية المصنفة عالمياً',
      description: 'دليل متخصص يقدم استراتيجيات متقدمة للنشر في المجلات العلمية ذات معامل التأثير المرتفع والمصنفة في قواعد البيانات العالمية.',
      contents: [
        'فهم تصنيفات المجلات العلمية ومعاملات التأثير',
        'اختيار المجلة المناسبة لبحثك',
        'هيكلة البحث وفق معايير النشر العالمية',
        'استراتيجيات صياغة العنوان والملخص والكلمات المفتاحية',
        'التعامل مع عملية التحكيم والمراجعة',
        'زيادة الاستشهادات ببحثك بعد النشر'
      ],
      price: '300 ريال',
      icon: '🔖'
    },
    {
      id: 3,
      title: 'دليل مهارات العرض والتقديم الأكاديمي',
      description: 'دليل متخصص في تطوير مهارات العرض والتقديم في السياقات الأكاديمية، من المؤتمرات العلمية إلى مناقشات الرسائل.',
      contents: [
        'تصميم العروض التقديمية الفعالة',
        'مهارات الإلقاء والتواصل مع الجمهور',
        'استراتيجيات الإجابة على الأسئلة والنقد',
        'استخدام الوسائل البصرية والتقنية بفعالية',
        'التعامل مع التوتر وبناء الثقة أثناء العرض'
      ],
      price: '250 ريال',
      icon: '🎯'
    },
    {
      id: 4,
      title: 'دليل التحليل الإحصائي المتقدم للبحوث العلمية',
      description: 'دليل متقدم في التحليل الإحصائي يغطي الاختبارات الإحصائية المتقدمة والنمذجة الإحصائية باستخدام برامج SPSS وAMOS وR.',
      contents: [
        'تحليل التباين متعدد المتغيرات (MANOVA)',
        'تحليل الانحدار المتعدد والمتدرج',
        'التحليل العاملي الاستكشافي والتوكيدي',
        'نمذجة المعادلات البنائية (SEM)',
        'تحليل البيانات الطولية',
        'الأساليب الإحصائية اللامعلمية المتقدمة'
      ],
      price: '400 ريال',
      icon: '📈'
    }
  ];

  const guideBundles = [
    {
      id: 1,
      title: 'باقة الباحث المبتدئ',
      guides: [
        'الدليل الشامل لكتابة الرسائل العلمية',
        'دليل مهارات العرض والتقديم الأكاديمي'
      ],
      price: '500 ريال',
      originalPrice: '600 ريال'
    },
    {
      id: 2,
      title: 'باقة النشر العلمي',
      guides: [
        'دليل النشر في المجلات العلمية المصنفة عالمياً',
        'دليل التحليل الإحصائي المتقدم للبحوث العلمية'
      ],
      price: '600 ريال',
      originalPrice: '700 ريال'
    },
    {
      id: 3,
      title: 'الباقة الشاملة',
      guides: [
        'الدليل الشامل لكتابة الرسائل العلمية',
        'دليل النشر في المجلات العلمية المصنفة عالمياً',
        'دليل مهارات العرض والتقديم الأكاديمي',
        'دليل التحليل الإحصائي المتقدم للبحوث العلمية'
      ],
      price: '900 ريال',
      originalPrice: '1300 ريال'
    }
  ];

  const additionalServices = [
    {
      id: 1,
      title: 'استشارة شخصية مع خبير أكاديمي',
      description: 'بعد شراء أي من الأدلة المدفوعة، يمكنك الحصول على جلسة استشارية شخصية مع أحد خبرائنا الأكاديميين لمناقشة تطبيق محتوى الدليل على بحثك الخاص.',
      duration: '60 دقيقة',
      price: '200 ريال'
    },
    {
      id: 2,
      title: 'ورش عمل تطبيقية',
      description: 'نقدم ورش عمل تطبيقية عبر الإنترنت لتطبيق محتوى الأدلة بشكل عملي، مع إمكانية التفاعل المباشر مع المدرب وطرح الأسئلة.',
      duration: '3 ساعات',
      price: '300 ريال للورشة الواحدة'
    }
  ];

  return (
    <div className="guides-page">
      <div className="page-header">
        <h1>الأدلة الأكاديمية</h1>
        <p>مجموعة من الأدلة المتخصصة لمساعدة الباحثين في مختلف مراحل البحث العلمي</p>
      </div>
      
      <section className="free-guides-section">
        <h2>الأدلة المجانية</h2>
        <div className="guides-grid">
          {freeGuides.map(guide => (
            <div key={guide.id} className="guide-card">
              <div className="guide-icon">{guide.icon}</div>
              <h3>{guide.title}</h3>
              <p className="guide-description">{guide.description}</p>
              <div className="guide-details">
                <h4>محتويات الدليل:</h4>
                <ul>
                  {guide.contents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="guide-importance">{guide.importance}</p>
              <button className="btn btn-primary">تحميل الدليل</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="paid-guides-section">
        <h2>الأدلة المدفوعة</h2>
        <div className="guides-grid">
          {paidGuides.map(guide => (
            <div key={guide.id} className="guide-card">
              <div className="guide-icon">{guide.icon}</div>
              <div className="guide-price">{guide.price}</div>
              <h3>{guide.title}</h3>
              <p className="guide-description">{guide.description}</p>
              <div className="guide-details">
                <h4>محتويات الدليل:</h4>
                <ul>
                  {guide.contents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary">شراء الدليل</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="guide-bundles-section">
        <h2>باقات الأدلة</h2>
        <div className="bundles-grid">
          {guideBundles.map(bundle => (
            <div key={bundle.id} className="bundle-card">
              <h3>{bundle.title}</h3>
              <div className="bundle-price">
                <span className="current-price">{bundle.price}</span>
                <span className="original-price">{bundle.originalPrice}</span>
              </div>
              <div className="bundle-details">
                <h4>الأدلة المتضمنة:</h4>
                <ul>
                  {bundle.guides.map((guide, index) => (
                    <li key={index}>{guide}</li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary">شراء الباقة</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="additional-services-section">
        <h2>خدمات إضافية</h2>
        <div className="services-grid">
          {additionalServices.map(service => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-details">
                <p><strong>المدة:</strong> {service.duration}</p>
                <p><strong>السعر:</strong> {service.price}</p>
              </div>
              <button className="btn btn-secondary">طلب الخدمة</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GuidesPage;
