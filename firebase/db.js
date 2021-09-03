const admin = require("firebase-admin");
const firebase = require("firebase");

const serviceAccount = require("../serviceAccount.json");
require("dotenv").config();

// API_KEY = AIzaSyDsuFHtdXaYVpPiz-XJcX8Q4PiMTc93wXA
// AUTH_DOMAIN = monocle-dev-cef69.firebaseapp.com
// PROJECT_ID = monocle-dev-cef69
// STORAGE_BUCKET = monocle-dev-cef69.appspot.com
// MESSAGING_SENDER_ID = 972771718903
// APP_ID = 1:972771718903:web:a4a465c7d13bb3cdc105f2
// MEASUREMENT_ID = G-4L0WDQBEXH

// apiKey: "AIzaSyDsuFHtdXaYVpPiz-XJcX8Q4PiMTc93wXA",
// authDomain: "monocle-dev-cef69.firebaseapp.com",
// projectId: "monocle-dev-cef69",
// storageBucket: "monocle-dev-cef69.appspot.com",
// messagingSenderId: "972771718903",
// appId: "1:972771718903:web:a4a465c7d13bb3cdc105f2",
// measurementId: "G-4L0WDQBEXH"
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});

firebase.initializeApp(config);

const firestore = admin.firestore();
const storage = admin.storage().bucket();

module.exports = {
  firestore,
  storage,
};
