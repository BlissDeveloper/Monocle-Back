const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();
const adminAuth = admin.auth();

module.exports = {
  firestore,
  storage,
  adminAuth
};
