import { initializeApp } from "firebase/app";
import {
  getAppCheck,
  ReCaptchaV3Provider,
  initializeAppCheck,
} from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgonph85DZX-6qS9vX_WAEwIWu58jLT_0",
  authDomain: "pathways-49ff2.firebaseapp.com",
  projectId: "pathways-49ff2",
  storageBucket: "pathways-49ff2.appspot.com",
  messagingSenderId: "877877999214",
  appId: "1:877877999214:web:ea6bb2dad3f0c5158bd87f",
  measurementId: "G-LSTLWXC33L",
};

// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (typeof window !== "undefined") {
  // Initialize App Check with reCAPTCHA v3 provider using the Site Key
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6LcF8PcpAAAAALe4uhuIAovCkUsp3z-1vT4aSwfE"
    ),
    isTokenAutoRefreshEnabled: true, // Optionally enable auto-refresh.
  });
}

export { auth, app, db };
