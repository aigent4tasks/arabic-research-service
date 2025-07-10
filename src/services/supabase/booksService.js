import { supabase } from '../../supabaseConfig';

// إضافة كتاب جديد
export const addBook = async (bookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([bookData])
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في إضافة الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// جلب جميع الكتب
export const getAllBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الكتب:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب المجانية
export const getFreeBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('is_free', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الكتب المجانية:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب المدفوعة
export const getPaidBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('is_free', false)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الكتب المدفوعة:', error);
    return { success: false, error: error.message };
  }
};

// تحديث كتاب
export const updateBook = async (bookId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update(updatedData)
      .eq('id', bookId)
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في تحديث الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// حذف كتاب
export const deleteBook = async (bookId) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب حسب التصنيف
export const getBooksByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الكتب حسب التصنيف:', error);
    return { success: false, error: error.message };
  }
};

// البحث في الكتب
export const searchBooks = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في البحث في الكتب:', error);
    return { success: false, error: error.message };
  }
};

// جلب كتاب واحد بالمعرف
export const getBookById = async (bookId) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الكتاب:', error);
    return { success: false, error: error.message };
  }
};

