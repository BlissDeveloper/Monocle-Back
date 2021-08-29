const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = process.env.AUTH_BASE_URL;

const signIn = (email, password) => {
  console.log("Email: " + email);
  console.log("Password: " + password);
  const path = "/accounts:signInWithPassword?key=" + process.env.API_KEY;
  return axios.post(path, {
    email: email,
    password: password,
  });
};

module.exports = {
  signIn,
};
