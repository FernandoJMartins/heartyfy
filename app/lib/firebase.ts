import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWtaQku1-f3F2FTm21EzvuOs25ty6oGVI",
    authDomain: "heartyfy.firebaseapp.com",
    projectId: "heartyfy",
    storageBucket: "heartyfy.firebasestorage.app",
    messagingSenderId: "658006232491",
    appId: "1:658006232491:web:1095f1d17661dff7e816ee",
    measurementId: "G-6B7PCCBS03"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
