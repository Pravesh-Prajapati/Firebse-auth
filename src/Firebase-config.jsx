// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtCz4T3tGSmMi9gmeE-XcGOb2JguL9uuY",
  authDomain: "authentication-db79d.firebaseapp.com",
  projectId: "authentication-db79d",
  storageBucket: "authentication-db79d.appspot.com",
  messagingSenderId: "133423839502",
  appId: "1:133423839502:web:3330bd0289c0a8aec37f5f",
  measurementId: "G-RWC5H1930L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Provider= new GoogleAuthProvider()
const auth= getAuth(app);

const analytics = getAnalytics(app);
// export const auth = getAuth(app)
export {Provider,auth}
