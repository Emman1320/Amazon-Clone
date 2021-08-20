import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAR07TYSmGHWS4nCQ1KLSm-AeNzcuXaHVs",
  authDomain: "clone-8d46b.firebaseapp.com",
  projectId: "clone-8d46b",
  storageBucket: "clone-8d46b.appspot.com",
  messagingSenderId: "742178542474",
  appId: "1:742178542474:web:f9a3c7a983885c9303ae73",
  measurementId: "G-W9HS1P80GL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
