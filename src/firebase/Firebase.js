import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig  = {
    apiKey: "AIzaSyBTLMtYYJFBeYUdluBj5URZOGAh5F4LE6Y",
    authDomain: "matching-movie-pairs-8ee49.firebaseapp.com",
    projectId: "matching-movie-pairs-8ee49",
    storageBucket: "matching-movie-pairs-8ee49.appspot.com",
    messagingSenderId: "586533732749",
    appId: "1:586533732749:web:e6035660beb4c16b75fdc4",
    measurementId: "G-MXVV55B5YS"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db}