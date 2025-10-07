// import { onMounted, ref } from 'vue'
import { getFirestore/*, collection, onSnapshot, doc, addDoc, deleteDoc*/ } from 'firebase/firestore'
import { initializeApp } from "firebase/app"

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCN9XCEirWPGbsWw62C5Y72HstR-eFCqWs",
  authDomain: "database-of-games.firebaseapp.com",
  projectId: "database-of-games",
  storageBucket: "database-of-games.appspot.com",
  messagingSenderId: "360568631021",
  appId: "1:360568631021:web:913337f7c9a43e7bae66e4"
}

// Init Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
export const firebaseApp = app