// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIqrAt-Z05hOZJrsJS9nUQ8iqLXvK7KXY",
  authDomain: "expense-tracker-9a35b.firebaseapp.com",
  projectId: "expense-tracker-9a35b",
  storageBucket: "expense-tracker-9a35b.firebasestorage.app",
  messagingSenderId: "864458556615",
  appId: "1:864458556615:web:4c96a07a90c79ba123eae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

//db
export const firestore = getFirestore(app)