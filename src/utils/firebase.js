import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Production firebase credentials
// TODO: Secure these
const firebaseConfig = {
    apiKey: "AIzaSyBBqKUiyRfV_v4WIpd0lFMGhEn6ZdrvEoc",
    authDomain: "letzrent-5f5a3.firebaseapp.com",
    databaseURL: "https://letzrent-5f5a3.firebaseio.com",
    projectId: "letzrent-5f5a3",
    storageBucket: "letzrent-5f5a3.appspot.com",
    messagingSenderId: "912635063803",
    appId: "1:912635063803:web:150ffbec7fa1a984e22f5e",
    measurementId: "G-BY93V551D2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
