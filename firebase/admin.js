const { adminAuth } = require("../firebase/db");

const checkUidExistence = (uid) => {
  return adminAuth.getUser(uid);
};

const generateToken = async (uid) => {
  return await adminAuth.createCustomToken(uid);
};

const verifyToken = async (token) => {
  const response = await adminAuth.verifyIdToken(token, true);
  //Token valid
  return response;
};

module.exports = {
  generateToken,
  verifyToken,
  checkUidExistence
};
