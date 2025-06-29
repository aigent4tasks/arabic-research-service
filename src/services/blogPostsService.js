import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

const BLOG_POSTS_COLLECTION = 'blogPosts';

// إضافة تدوينة علمية جديدة
export const addBlogPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, BLOG_POSTS_COLLECTION), {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إضافة التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// جلب جميع التدوينات العلمية
export const getAllBlogPosts = async () => {
  try {
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error('خطأ في جلب التدوينات:', error);
    return { success: false, error: error.message };
  }
};

// جلب التدوينات حسب العلامات (Tags)
export const getBlogPostsByTag = async (tag) => {
  try {
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION), 
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error('خطأ في جلب التدوينات حسب العلامة:', error);
    return { success: false, error: error.message };
  }
};

// تحديث تدوينة علمية
export const updateBlogPost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId);
    await updateDoc(postRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// حذف تدوينة علمية
export const deleteBlogPost = async (postId) => {
  try {
    await deleteDoc(doc(db, BLOG_POSTS_COLLECTION, postId));
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف التدوينة:', error);
    return { success: false, error: error.message };
  }
};

// البحث في التدوينات
export const searchBlogPosts = async (searchTerm) => {
  try {
    // ملاحظة: Firestore لا يدعم البحث النصي المتقدم بشكل مباشر
    // هذا مثال بسيط للبحث في العناوين
    const querySnapshot = await getDocs(collection(db, BLOG_POSTS_COLLECTION));
    const posts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        posts.push({ id: doc.id, ...data });
      }
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error('خطأ في البحث في التدوينات:', error);
    return { success: false, error: error.message };
  }
};

