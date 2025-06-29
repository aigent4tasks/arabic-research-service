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

const BOOKS_COLLECTION = 'books';

// إضافة كتاب جديد
export const addBook = async (bookData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
      ...bookData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إضافة الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// جلب جميع الكتب
export const getAllBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, BOOKS_COLLECTION));
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: books };
  } catch (error) {
    console.error('خطأ في جلب الكتب:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب المجانية
export const getFreeBooks = async () => {
  try {
    const q = query(
      collection(db, BOOKS_COLLECTION), 
      where('isFree', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: books };
  } catch (error) {
    console.error('خطأ في جلب الكتب المجانية:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب المدفوعة
export const getPaidBooks = async () => {
  try {
    const q = query(
      collection(db, BOOKS_COLLECTION), 
      where('isFree', '==', false),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: books };
  } catch (error) {
    console.error('خطأ في جلب الكتب المدفوعة:', error);
    return { success: false, error: error.message };
  }
};

// تحديث كتاب
export const updateBook = async (bookId, updatedData) => {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, bookId);
    await updateDoc(bookRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// حذف كتاب
export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, BOOKS_COLLECTION, bookId));
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف الكتاب:', error);
    return { success: false, error: error.message };
  }
};

// جلب الكتب حسب التصنيف
export const getBooksByCategory = async (category) => {
  try {
    const q = query(
      collection(db, BOOKS_COLLECTION), 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: books };
  } catch (error) {
    console.error('خطأ في جلب الكتب حسب التصنيف:', error);
    return { success: false, error: error.message };
  }
};

