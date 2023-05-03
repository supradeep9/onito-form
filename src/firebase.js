import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBB5XN2HCO3H2_TyL5GNHM5Zyt4vtLjKU8",
  authDomain: "form-236c7.firebaseapp.com",
  projectId: "form-236c7",
  storageBucket: "form-236c7.appspot.com",
  messagingSenderId: "489625690057",
  appId: "1:489625690057:web:1b9926d4277b5fc82bd218",
};

// Initialize Firebase

var firebaseDB = firebase.initializeApp(firebaseConfig);
export default firebaseDB.database().ref();
