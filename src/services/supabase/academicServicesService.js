import { supabase } from '../../supabaseConfig';

// إضافة خدمة أكاديمية جديدة
export const addAcademicService = async (serviceData) => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .insert([{
        title: serviceData.title,
        description: serviceData.description,
        detailed_description: serviceData.detailedDescription,
        category: serviceData.category,
        price: parseFloat(serviceData.price),
        duration_days: parseInt(serviceData.durationDays) || null,
        features: serviceData.features || [],
        requirements: serviceData.requirements,
        deliverables: serviceData.deliverables,
        is_active: serviceData.isActive !== undefined ? serviceData.isActive : true,
        image: serviceData.image,
        contact_info: serviceData.contactInfo
      }])
      .select();

    if (error) {
      console.error('خطأ في إضافة الخدمة الأكاديمية:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على جميع الخدمات الأكاديمية
export const getAllAcademicServices = async () => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب الخدمات الأكاديمية:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على الخدمات النشطة فقط
export const getActiveAcademicServices = async () => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب الخدمات النشطة:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على خدمة أكاديمية بواسطة ID
export const getAcademicServiceById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('خطأ في جلب الخدمة الأكاديمية:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// تحديث خدمة أكاديمية
export const updateAcademicService = async (id, serviceData) => {
  try {
    const updateData = {
      title: serviceData.title,
      description: serviceData.description,
      detailed_description: serviceData.detailedDescription,
      category: serviceData.category,
      price: parseFloat(serviceData.price),
      duration_days: parseInt(serviceData.durationDays) || null,
      features: serviceData.features || [],
      requirements: serviceData.requirements,
      deliverables: serviceData.deliverables,
      is_active: serviceData.isActive !== undefined ? serviceData.isActive : true,
      image: serviceData.image,
      contact_info: serviceData.contactInfo
    };

    const { data, error } = await supabase
      .from('academic_services')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('خطأ في تحديث الخدمة الأكاديمية:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// حذف خدمة أكاديمية
export const deleteAcademicService = async (id) => {
  try {
    const { error } = await supabase
      .from('academic_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('خطأ في حذف الخدمة الأكاديمية:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على الخدمات حسب التصنيف
export const getAcademicServicesByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب الخدمات حسب التصنيف:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على التصنيفات المتاحة
export const getServiceCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('category')
      .eq('is_active', true);

    if (error) {
      console.error('خطأ في جلب التصنيفات:', error);
      return { success: false, error: error.message };
    }

    // استخراج التصنيفات الفريدة
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return { success: true, data: uniqueCategories };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// البحث في الخدمات الأكاديمية
export const searchAcademicServices = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('academic_services')
      .select('*')
      .eq('is_active', true)
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في البحث:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// تبديل حالة الخدمة (نشط/غير نشط)
export const toggleServiceStatus = async (id) => {
  try {
    // أولاً، احصل على الحالة الحالية
    const { data: currentData, error: fetchError } = await supabase
      .from('academic_services')
      .select('is_active')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('خطأ في جلب حالة الخدمة:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // ثم قم بتبديل الحالة
    const { data, error } = await supabase
      .from('academic_services')
      .update({ is_active: !currentData.is_active })
      .eq('id', id)
      .select();

    if (error) {
      console.error('خطأ في تبديل حالة الخدمة:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

// الحصول على إحصائيات الخدمات
export const getServicesStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('services_by_category')
      .select('*');

    if (error) {
      console.error('خطأ في جلب إحصائيات الخدمات:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
};

