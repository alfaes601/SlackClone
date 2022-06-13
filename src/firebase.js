import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO-XSURODtuaSRbew3421cFDvDIFPgP5Q",
  authDomain: "slack-clone-c0e17.firebaseapp.com",
  projectId: "slack-clone-c0e17",
  storageBucket: "slack-clone-c0e17.appspot.com",
  messagingSenderId: "890126930060",
  appId: "1:890126930060:web:da5baa210b9583fe216ba9",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
