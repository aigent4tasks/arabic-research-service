import { supabase } from '../../supabaseConfig';

// تسجيل الدخول للإداري
export const adminLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // التحقق من أن المستخدم إداري
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      throw new Error('غير مصرح لك بالوصول إلى لوحة التحكم');
    }

    return { 
      success: true, 
      user: data.user,
      adminData 
    };
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return { success: false, error: error.message };
  }
};

// تسجيل الخروج
export const adminLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return { success: false, error: error.message };
  }
};

// التحقق من حالة المصادقة
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    if (!user) {
      return { success: false, error: 'غير مسجل الدخول' };
    }

    // التحقق من أن المستخدم إداري
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      return { success: false, error: 'غير مصرح لك بالوصول' };
    }

    return { 
      success: true, 
      user,
      adminData 
    };
  } catch (error) {
    console.error('خطأ في التحقق من المستخدم:', error);
    return { success: false, error: error.message };
  }
};

// مراقبة تغييرات حالة المصادقة
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};

// إنشاء مستخدم إداري جديد (للمطورين فقط)
export const createAdminUser = async (userData) => {
  try {
    // إنشاء المستخدم في Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw authError;

    // إضافة المستخدم إلى جدول الإداريين
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .insert([{
        email: userData.email,
        name: userData.name,
        is_active: true
      }])
      .select();

    if (adminError) throw adminError;

    return { 
      success: true, 
      user: authData.user,
      adminData: adminData[0] 
    };
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم الإداري:', error);
    return { success: false, error: error.message };
  }
};

