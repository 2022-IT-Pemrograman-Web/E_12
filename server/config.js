const firebase = require("firebase-admin");
const firebaseConfig = {
    apiKey: "AIzaSyAT3JAcxQ4HOEtc_VX_nl6FPKVUg978UNw",
    authDomain: "fp-pweb-700bf.firebaseapp.com",
    projectId: "fp-pweb-700bf",
    storageBucket: "fp-pweb-700bf.appspot.com",
    messagingSenderId: "996588048912",
    appId: "1:996588048912:web:e6d49b3ab4a95733e3f095"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const User = db.collection("Users");
const Instruments = db.collection("instruments");
const Musics = db.collection("musics");

module.exports = { User, Instruments, Musics };