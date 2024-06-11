// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpD92aD0YNkIcnht14ScivBXOdKUduB6w",
  authDomain: "e-store-fc5f6.firebaseapp.com",
  projectId: "e-store-fc5f6",
  storageBucket: "e-store-fc5f6.appspot.com",
  messagingSenderId: "341647350562",
  appId: "1:341647350562:web:bb81580cc2e8d5aa11a37b",
  measurementId: "G-W0RJEY6VTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
