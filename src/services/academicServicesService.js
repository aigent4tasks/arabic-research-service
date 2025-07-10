// واجهة موحدة للخدمات الأكاديمية - استبدال المقالات التحفيزية
// تصدير جميع خدمات Supabase للخدمات الأكاديمية

export {
  addAcademicService,
  getAllAcademicServices,
  getActiveAcademicServices,
  getAcademicServiceById,
  updateAcademicService,
  deleteAcademicService,
  getAcademicServicesByCategory,
  getServiceCategories,
  searchAcademicServices,
  toggleServiceStatus,
  getServicesStatistics
} from './supabase/academicServicesService';

// دوال مساعدة للتعامل مع البيانات

// تنسيق بيانات الخدمة للعرض
export const formatServiceForDisplay = (service) => {
  return {
    ...service,
    formattedPrice: `${service.price} ريال`,
    formattedDuration: service.duration_days ? `${service.duration_days} أيام` : 'حسب الاتفاق',
    featuresText: service.features ? service.features.join(' • ') : '',
    categoryDisplay: getCategoryDisplayName(service.category)
  };
};

// الحصول على اسم التصنيف للعرض
export const getCategoryDisplayName = (category) => {
  const categoryMap = {
    'استشارات': 'الاستشارات البحثية',
    'تحليل إحصائي': 'التحليل الإحصائي',
    'مراجعة لغوية': 'المراجعة اللغوية',
    'كتابة أكاديمية': 'الكتابة الأكاديمية',
    'ترجمة': 'خدمات الترجمة',
    'تصميم': 'التصميم والإخراج',
    'أخرى': 'خدمات أخرى'
  };
  
  return categoryMap[category] || category;
};

// الحصول على لون التصنيف
export const getCategoryColor = (category) => {
  const colorMap = {
    'استشارات': '#3498db',
    'تحليل إحصائي': '#e74c3c',
    'مراجعة لغوية': '#2ecc71',
    'كتابة أكاديمية': '#f39c12',
    'ترجمة': '#9b59b6',
    'تصميم': '#1abc9c',
    'أخرى': '#95a5a6'
  };
  
  return colorMap[category] || '#95a5a6';
};

// التحقق من صحة بيانات الخدمة
export const validateServiceData = (serviceData) => {
  const errors = [];

  if (!serviceData.title || serviceData.title.trim().length < 3) {
    errors.push('عنوان الخدمة يجب أن يكون 3 أحرف على الأقل');
  }

  if (!serviceData.description || serviceData.description.trim().length < 10) {
    errors.push('وصف الخدمة يجب أن يكون 10 أحرف على الأقل');
  }

  if (!serviceData.category || serviceData.category.trim().length === 0) {
    errors.push('يجب اختيار تصنيف للخدمة');
  }

  if (!serviceData.price || isNaN(parseFloat(serviceData.price)) || parseFloat(serviceData.price) < 0) {
    errors.push('سعر الخدمة يجب أن يكون رقماً صحيحاً أكبر من أو يساوي صفر');
  }

  if (serviceData.durationDays && (isNaN(parseInt(serviceData.durationDays)) || parseInt(serviceData.durationDays) < 1)) {
    errors.push('مدة التنفيذ يجب أن تكون رقماً صحيحاً أكبر من صفر');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// تنظيف بيانات الخدمة قبل الحفظ
export const sanitizeServiceData = (serviceData) => {
  return {
    title: serviceData.title?.trim(),
    description: serviceData.description?.trim(),
    detailedDescription: serviceData.detailedDescription?.trim(),
    category: serviceData.category?.trim(),
    price: parseFloat(serviceData.price) || 0,
    durationDays: serviceData.durationDays ? parseInt(serviceData.durationDays) : null,
    features: Array.isArray(serviceData.features) ? serviceData.features.filter(f => f.trim()) : [],
    requirements: serviceData.requirements?.trim(),
    deliverables: serviceData.deliverables?.trim(),
    isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
    image: serviceData.image?.trim(),
    contactInfo: serviceData.contactInfo?.trim()
  };
};

// تحويل النص إلى مصفوفة ميزات
export const parseFeatures = (featuresText) => {
  if (!featuresText) return [];
  
  return featuresText
    .split(/[,،\n]/) // فصل بالفاصلة العربية أو الإنجليزية أو سطر جديد
    .map(feature => feature.trim())
    .filter(feature => feature.length > 0);
};

// تحويل مصفوفة الميزات إلى نص
export const stringifyFeatures = (features) => {
  if (!Array.isArray(features)) return '';
  
  return features
    .filter(feature => feature && feature.trim())
    .join('، ');
};

// فلترة الخدمات حسب معايير متعددة
export const filterServices = (services, filters) => {
  return services.filter(service => {
    // فلترة حسب التصنيف
    if (filters.category && service.category !== filters.category) {
      return false;
    }

    // فلترة حسب النطاق السعري
    if (filters.minPrice !== undefined && service.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && service.price > filters.maxPrice) {
      return false;
    }

    // فلترة حسب المدة
    if (filters.maxDuration !== undefined && service.duration_days && service.duration_days > filters.maxDuration) {
      return false;
    }

    // فلترة حسب الحالة
    if (filters.isActive !== undefined && service.is_active !== filters.isActive) {
      return false;
    }

    return true;
  });
};

// ترتيب الخدمات
export const sortServices = (services, sortBy = 'created_at', sortOrder = 'desc') => {
  return [...services].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // معالجة خاصة للتواريخ
    if (sortBy === 'created_at' || sortBy === 'updated_at') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // معالجة خاصة للأرقام
    if (sortBy === 'price' || sortBy === 'duration_days') {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

// الحصول على خيارات التصنيف المتاحة
export const getAvailableCategories = () => {
  return [
    { value: 'استشارات', label: 'الاستشارات البحثية', color: '#3498db' },
    { value: 'تحليل إحصائي', label: 'التحليل الإحصائي', color: '#e74c3c' },
    { value: 'مراجعة لغوية', label: 'المراجعة اللغوية', color: '#2ecc71' },
    { value: 'كتابة أكاديمية', label: 'الكتابة الأكاديمية', color: '#f39c12' },
    { value: 'ترجمة', label: 'خدمات الترجمة', color: '#9b59b6' },
    { value: 'تصميم', label: 'التصميم والإخراج', color: '#1abc9c' },
    { value: 'أخرى', label: 'خدمات أخرى', color: '#95a5a6' }
  ];
};

