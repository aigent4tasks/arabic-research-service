# هيكل قاعدة البيانات Firebase Firestore

## المجموعات (Collections)

### 1. books (الكتب)
```json
{
  "id": "auto-generated-id",
  "title": "اسم الكتاب",
  "description": "وصف موجز للكتاب",
  "coverImage": "رابط صورة الغلاف",
  "fileUrl": "رابط التحميل أو المعاينة",
  "isFree": true,
  "price": 0,
  "category": "منهجية بحث",
  "createdAt": "2025-06-29T10:00:00Z",
  "updatedAt": "2025-06-29T10:00:00Z"
}
```

**الحقول:**
- `title` (string): عنوان الكتاب
- `description` (string): وصف مختصر للكتاب
- `coverImage` (string): رابط صورة الغلاف
- `fileUrl` (string): رابط التحميل أو المعاينة
- `isFree` (boolean): true للكتب المجانية، false للمدفوعة
- `price` (number): السعر (0 للكتب المجانية)
- `category` (string): تصنيف الكتاب
- `createdAt` (string): تاريخ الإنشاء
- `updatedAt` (string): تاريخ آخر تحديث

### 2. blogPosts (التدوينات العلمية)
```json
{
  "id": "auto-generated-id",
  "title": "عنوان التدوينة",
  "content": "محتوى التدوينة HTML أو Markdown",
  "tags": ["تحكيم", "نشر", "باحث مبتدئ"],
  "createdAt": "2025-06-29T10:00:00Z",
  "updatedAt": "2025-06-29T10:00:00Z"
}
```

**الحقول:**
- `title` (string): عنوان التدوينة
- `content` (string): محتوى التدوينة (HTML أو Markdown)
- `tags` (array): مصفوفة من العلامات/الكلمات المفتاحية
- `createdAt` (string): تاريخ الإنشاء
- `updatedAt` (string): تاريخ آخر تحديث

### 3. motivationalArticles (المقالات التحفيزية)
```json
{
  "id": "auto-generated-id",
  "title": "عنوان المقال",
  "content": "محتوى المقال التحفيزي",
  "image": "رابط لصورة مرفقة (اختياري)",
  "ctaText": "اشترِ الآن",
  "ctaLink": "رابط للشراء أو التواصل",
  "createdAt": "2025-06-29T10:00:00Z",
  "updatedAt": "2025-06-29T10:00:00Z"
}
```

**الحقول:**
- `title` (string): عنوان المقال
- `content` (string): محتوى المقال
- `image` (string, اختياري): رابط صورة مرفقة
- `ctaText` (string): نص زر الدعوة للعمل
- `ctaLink` (string): رابط زر الدعوة للعمل
- `createdAt` (string): تاريخ الإنشاء
- `updatedAt` (string): تاريخ آخر تحديث

## قواعد الأمان (Security Rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /{document=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة والتعديل والحذف للجميع (مؤقتاً)
    // يُنصح بتقييد هذا لاحقاً بنظام مصادقة
    match /{document=**} {
      allow write: if true;
    }
  }
}
```

**ملاحظة مهمة:** قواعد الأمان الحالية تسمح للجميع بالقراءة والكتابة. يُنصح بشدة بتقييد صلاحيات الكتابة لاحقاً عند إضافة نظام المصادقة.

## الفهارس المطلوبة (Indexes)

### للكتب:
- `isFree` + `createdAt` (تنازلي)
- `category` + `createdAt` (تنازلي)

### للتدوينات العلمية:
- `tags` (array) + `createdAt` (تنازلي)
- `createdAt` (تنازلي)

### للمقالات التحفيزية:
- `createdAt` (تنازلي)

هذه الفهارس ستُنشأ تلقائياً عند أول استعلام، أو يمكن إنشاؤها يدوياً من Firebase Console.

