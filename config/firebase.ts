import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIqrAt-Z05hOZJrsJS9nUQ8iqLXvK7KXY",
  authDomain: "expense-tracker-9a35b.firebaseapp.com",
  projectId: "expense-tracker-9a35b",
  storageBucket: "expense-tracker-9a35b.appspot.com",
  messagingSenderId: "864458556615",
  appId: "1:864458556615:web:4c96a07a90c79ba123eae2"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
