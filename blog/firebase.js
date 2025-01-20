// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { doc, setDoc, getFirestore, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC_QVns9AOL4FvsyqYLskM4CEvFLL7iXA",
  authDomain: "new-blog-29184.firebaseapp.com",
  projectId: "new-blog-29184",
  storageBucket: "new-blog-29184.firebasestorage.app",
  messagingSenderId: "1015517571423",
  appId: "1:1015517571423:web:716b6a1a7e14e69e3f6eea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  app,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onAuthStateChanged
};

