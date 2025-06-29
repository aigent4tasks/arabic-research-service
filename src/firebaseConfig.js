import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWFuYyyfW3Bv1TeuSk90wqwDs9xdVhong",
  authDomain: "academicresearchservice-3f0f6.firebaseapp.com",
  projectId: "academicresearchservice-3f0f6",
  storageBucket: "academicresearchservice-3f0f6.firebasestorage.app",
  messagingSenderId: "597151241959",
  appId: "1:597151241959:web:d3bc73bdd80b57e002b442",
  measurementId: "G-H5FF2H4MZ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


