import { supabase } from '../../supabaseConfig';

// إضافة تدوينة علمية جديدة
export const addBlogPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في إضافة التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// جلب جميع التدوينات العلمية
export const getAllBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب التدوينات:', error);
    return { success: false, error: error.message };
  }
};

// جلب التدوينات حسب العلامات (Tags)
export const getBlogPostsByTag = async (tag) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .contains('tags', [tag])
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب التدوينات حسب العلامة:', error);
    return { success: false, error: error.message };
  }
};

// تحديث تدوينة علمية
export const updateBlogPost = async (postId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updatedData)
      .eq('id', postId)
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في تحديث التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// حذف تدوينة علمية
export const deleteBlogPost = async (postId) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// البحث في التدوينات
export const searchBlogPosts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في البحث في التدوينات:', error);
    return { success: false, error: error.message };
  }
};

// جلب تدوينة واحدة بالمعرف
export const getBlogPostById = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب التدوينة:', error);
    return { success: false, error: error.message };
  }
};

