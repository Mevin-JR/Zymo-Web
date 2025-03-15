import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// App firebase config
const appFirebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const appFirebase =
    getApps().find((app) => app.name === "appFirebase") ||
    initializeApp(appFirebaseConfig, "appFirebase");
const appDB = getFirestore(appFirebase);
const appAuth = getAuth(appFirebase);
const appStorage = getStorage(appFirebase);

// Website firebase config
const webFirebaseConfig = {
    apiKey: import.meta.env.VITE_WEBSITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_WEBSITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_WEBSITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_WEBSITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_WEBSITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_WEBSITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_WEBSITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_WEBSITE_FIREBASE_MEASUREMENT_ID,
};

const webFirebase =
    getApps().find((app) => app.name === "webFirebase") ||
    initializeApp(webFirebaseConfig, "webFirebase");
const webDB = getFirestore(webFirebase);
const webStorage = getStorage(webFirebase);

export { appDB, appAuth, appStorage, webDB, webStorage };
