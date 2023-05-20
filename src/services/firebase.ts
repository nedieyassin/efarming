// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBak3GptarYwHsj8RW-eXPIa6AiI_Oge7Q",
    authDomain: "e-farming-d53bd.firebaseapp.com",
    projectId: "e-farming-d53bd",
    storageBucket: "e-farming-d53bd.appspot.com",
    messagingSenderId: "189200082084",
    appId: "1:189200082084:web:fa01f6ca220bb232fa3231",
    measurementId: "G-DF6P1E8FGE"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);