import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

const MOTIVATIONAL_ARTICLES_COLLECTION = 'motivationalArticles';

// إضافة مقال تحفيزي جديد
export const addMotivationalArticle = async (articleData) => {
  try {
    const docRef = await addDoc(collection(db, MOTIVATIONAL_ARTICLES_COLLECTION), {
      ...articleData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إضافة المقال التحفيزي:', error);
    return { success: false, error: error.message };
  }
};

// جلب جميع المقالات التحفيزية
export const getAllMotivationalArticles = async () => {
  try {
    const q = query(
      collection(db, MOTIVATIONAL_ARTICLES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: articles };
  } catch (error) {
    console.error('خطأ في جلب المقالات التحفيزية:', error);
    return { success: false, error: error.message };
  }
};

// تحديث مقال تحفيزي
export const updateMotivationalArticle = async (articleId, updatedData) => {
  try {
    const articleRef = doc(db, MOTIVATIONAL_ARTICLES_COLLECTION, articleId);
    await updateDoc(articleRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث المقال التحفيزي:', error);
    return { success: false, error: error.message };
  }
};

// حذف مقال تحفيزي
export const deleteMotivationalArticle = async (articleId) => {
  try {
    await deleteDoc(doc(db, MOTIVATIONAL_ARTICLES_COLLECTION, articleId));
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف المقال التحفيزي:', error);
    return { success: false, error: error.message };
  }
};

// البحث في المقالات التحفيزية
export const searchMotivationalArticles = async (searchTerm) => {
  try {
    const querySnapshot = await getDocs(collection(db, MOTIVATIONAL_ARTICLES_COLLECTION));
    const articles = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        articles.push({ id: doc.id, ...data });
      }
    });
    return { success: true, data: articles };
  } catch (error) {
    console.error('خطأ في البحث في المقالات التحفيزية:', error);
    return { success: false, error: error.message };
  }
};

