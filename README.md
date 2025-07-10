# خدمة الباحث الأكاديمي - الإصدار 2.0

## نظرة عامة على المشروع

خدمة الباحث الأكاديمي هي منصة ويب متخصصة في تقديم الخدمات الأكاديمية للباحثين العرب. تم تطوير هذا المشروع باستخدام React.js مع Supabase كقاعدة بيانات، ويتضمن نظام إدارة محتوى متكامل للتدوينات العلمية والكتب والمقالات التحفيزية.

## الميزات الرئيسية

### 🔐 نظام إدارة آمن
- تسجيل دخول آمن للإداريين فقط
- حماية صفحات الإدارة بنظام مصادقة متقدم
- إدارة جلسات المستخدمين

### 📝 إدارة المحتوى
- **التدوينات العلمية**: إضافة، تعديل، حذف مع نظام العلامات (Tags)
- **الكتب الأكاديمية**: إدارة الكتب المجانية والمدفوعة مع التصنيفات
- **المقالات التحفيزية**: إدارة المقالات مع روابط الدعوة للعمل (CTA)

### 🎨 واجهة مستخدم متطورة
- تصميم متجاوب يعمل على جميع الأجهزة
- واجهة عربية بالكامل مع دعم RTL
- تصميم حديث وجذاب

### 🛡️ الأمان والحماية
- Row Level Security (RLS) في قاعدة البيانات
- تشفير كلمات المرور
- حماية API endpoints

## التقنيات المستخدمة

### Frontend
- **React.js 18**: مكتبة JavaScript لبناء واجهات المستخدم
- **React Router DOM**: للتنقل بين الصفحات
- **Styled Components**: لتنسيق المكونات
- **React Slick**: لعرض المحتوى بشكل تفاعلي

### Backend & Database
- **Supabase**: منصة Backend-as-a-Service
- **PostgreSQL**: قاعدة البيانات الرئيسية
- **Supabase Auth**: نظام المصادقة والتفويض

### Development & Deployment
- **Node.js**: بيئة تشغيل JavaScript
- **npm**: مدير الحزم
- **GitHub Pages**: منصة النشر
- **Git**: نظام إدارة الإصدارات

## بنية المشروع

```
arabic-research-service/
├── public/                     # الملفات العامة
├── src/
│   ├── components/            # المكونات المشتركة
│   │   └── common/           # المكونات الأساسية
│   │       ├── Header.js     # رأس الصفحة
│   │       ├── Footer.js     # تذييل الصفحة
│   │       └── ProtectedRoute.js  # حماية المسارات
│   ├── pages/                # صفحات التطبيق
│   │   ├── HomePage/         # الصفحة الرئيسية
│   │   ├── BlogPage/         # صفحة المدونة
│   │   ├── ServicesPage/     # صفحة الخدمات
│   │   ├── LoginPage/        # صفحة تسجيل الدخول
│   │   └── DashboardPage/    # لوحة التحكم
│   ├── services/             # خدمات API
│   │   ├── supabase/         # خدمات Supabase
│   │   │   ├── authService.js
│   │   │   ├── blogPostsService.js
│   │   │   ├── booksService.js
│   │   │   └── motivationalArticlesService.js
│   │   ├── blogPostsService.js    # واجهة موحدة للتدوينات
│   │   ├── booksService.js        # واجهة موحدة للكتب
│   │   └── motivationalArticlesService.js  # واجهة موحدة للمقالات
│   ├── styles/               # ملفات التنسيق
│   ├── supabaseConfig.js     # إعدادات Supabase
│   ├── App.js               # المكون الرئيسي
│   └── index.js             # نقطة دخول التطبيق
├── package.json             # تبعيات المشروع
└── README.md               # هذا الملف
```

## قاعدة البيانات

### الجداول الرئيسية

#### 1. blog_posts (التدوينات العلمية)
```sql
- id: UUID (Primary Key)
- title: TEXT (عنوان التدوينة)
- content: TEXT (محتوى التدوينة)
- tags: TEXT[] (العلامات)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 2. books (الكتب)
```sql
- id: UUID (Primary Key)
- title: TEXT (عنوان الكتاب)
- description: TEXT (وصف الكتاب)
- cover_image: TEXT (رابط صورة الغلاف)
- file_url: TEXT (رابط الملف)
- category: TEXT (التصنيف)
- is_free: BOOLEAN (مجاني أم لا)
- price: DECIMAL (السعر)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 3. motivational_articles (المقالات التحفيزية)
```sql
- id: UUID (Primary Key)
- title: TEXT (عنوان المقال)
- content: TEXT (محتوى المقال)
- image: TEXT (رابط الصورة)
- cta_text: TEXT (نص زر الدعوة للعمل)
- cta_link: TEXT (رابط زر الدعوة للعمل)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 4. admin_users (المستخدمون الإداريون)
```sql
- id: UUID (Primary Key)
- email: TEXT (البريد الإلكتروني)
- password_hash: TEXT (كلمة المرور المشفرة)
- name: TEXT (الاسم)
- is_active: BOOLEAN (نشط أم لا)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## الإعداد والتشغيل

### المتطلبات الأساسية
- Node.js (الإصدار 16 أو أحدث)
- npm أو yarn
- حساب Supabase
- حساب GitHub (للنشر)

### خطوات الإعداد

#### 1. استنساخ المشروع
```bash
git clone https://github.com/aigent4tasks/arabic-research-service.git
cd arabic-research-service
```

#### 2. تثبيت التبعيات
```bash
npm install
```

#### 3. إعداد Supabase
1. أنشئ مشروعاً جديداً في [Supabase](https://supabase.com)
2. انسخ URL المشروع و Anon Key
3. حدث ملف `src/supabaseConfig.js`:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

#### 4. إنشاء قاعدة البيانات
1. اذهب إلى SQL Editor في Supabase
2. نفذ محتوى ملف `supabase_schema.sql`

#### 5. إنشاء مستخدم إداري
```sql
-- في Supabase SQL Editor
INSERT INTO admin_users (email, name) VALUES 
('your-email@example.com', 'اسمك الكامل');
```

#### 6. إعداد المصادقة في Supabase
1. اذهب إلى Authentication > Settings
2. فعّل Email authentication
3. أضف المستخدم الإداري من Authentication > Users

#### 7. تشغيل المشروع محلياً
```bash
npm start
```

الموقع سيكون متاحاً على: `http://localhost:3000/arabic-research-service`

## النشر

### النشر على GitHub Pages

#### 1. بناء المشروع
```bash
npm run build
```

#### 2. النشر
```bash
npm run deploy
```

### إعداد GitHub Pages
1. اذهب إلى إعدادات المستودع في GitHub
2. في قسم Pages، اختر فرع `gh-pages`
3. احفظ الإعدادات

## استخدام النظام

### للمطورين

#### تسجيل الدخول
1. اذهب إلى `/login`
2. أدخل البريد الإلكتروني وكلمة المرور
3. ستتم إعادة التوجيه إلى لوحة التحكم

#### إدارة المحتوى
- **التدوينات**: إضافة، تعديل، حذف مع إمكانية إضافة علامات
- **الكتب**: إدارة الكتب مع تحديد النوع (مجاني/مدفوع) والسعر
- **المقالات**: إدارة المقالات التحفيزية مع روابط CTA

### للمستخدمين النهائيين
- تصفح التدوينات العلمية
- تحميل الكتب المجانية
- قراءة المقالات التحفيزية
- طلب الخدمات الأكاديمية

## الأمان

### إجراءات الحماية المطبقة
- Row Level Security (RLS) في قاعدة البيانات
- تشفير كلمات المرور باستخدام bcrypt
- حماية المسارات الإدارية
- التحقق من صحة المدخلات
- CORS محدود للنطاقات المصرح بها

### أفضل الممارسات الأمنية
- استخدم كلمات مرور قوية
- لا تشارك Service Role Key علناً
- راجع RLS policies بانتظام
- استخدم HTTPS في الإنتاج
- قم بتحديث التبعيات بانتظام

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### خطأ "relation does not exist"
**السبب**: لم يتم إنشاء قاعدة البيانات
**الحل**: تنفيذ ملف `supabase_schema.sql` في Supabase

#### خطأ في تسجيل الدخول
**السبب**: عدم وجود المستخدم في جدول admin_users
**الحل**: إضافة المستخدم إلى قاعدة البيانات

#### مشاكل CORS
**السبب**: إعدادات CORS في Supabase
**الحل**: تحديث إعدادات CORS في Supabase Dashboard

#### مشاكل النشر
**السبب**: إعدادات GitHub Pages
**الحل**: التأكد من تحديث homepage في package.json

## المساهمة في المشروع

### إرشادات المساهمة
1. Fork المشروع
2. أنشئ فرعاً جديداً للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

### معايير الكود
- استخدم ESLint للتحقق من جودة الكود
- اتبع نمط التسمية المتسق
- أضف تعليقات للكود المعقد
- اكتب اختبارات للميزات الجديدة

## الدعم والمساعدة

### الموارد المفيدة
- [وثائق React](https://reactjs.org/docs)
- [وثائق Supabase](https://supabase.com/docs)
- [وثائق GitHub Pages](https://pages.github.com/)

### الحصول على المساعدة
- افتح Issue في GitHub للمشاكل التقنية
- راجع قسم استكشاف الأخطاء أولاً
- تأكد من تحديث التبعيات

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الشكر والتقدير

- فريق React لتطوير مكتبة رائعة
- فريق Supabase لتوفير منصة Backend ممتازة
- المجتمع العربي للمطورين للدعم والإلهام

---

**تم تطوير هذا المشروع بواسطة**: فريق خدمة الباحث الأكاديمي  
**آخر تحديث**: 2025-07-09  
**الإصدار**: 2.0.0

