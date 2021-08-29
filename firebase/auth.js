const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = process.env.AUTH_BASE_URL;

const API_KEY = process.env.API_KEY;

const signIn = (email, password) => {
  const path = "/accounts:signInWithPassword?key=" + API_KEY;
  return axios.post(path, {
    email: email,
    password: password,
  });
};

const forgotPass = (email) => {
  //accounts:sendOobCode?key=[API_KEY]
  //   requestType	string	The kind of OOB code to return. Should be "PASSWORD_RESET" for password reset.
  // email	string	User's email address.
  const path = "/accounts:sendOobCode?key=" + API_KEY;
  return axios.post(path, {
    requestType: "PASSWORD_RESET",
    email: email,
  });
};

module.exports = {
  signIn,
  forgotPass,
};
