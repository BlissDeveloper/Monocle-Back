require("dotenv").config();
const axios = require("axios");

const BASE_URL = process.env.PLACES_BASE_URL;
const API_KEY = process.env.API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const search = (query) => {
  const path = "findplacefromtext/";
  return axiosInstance.get(path, {
    params: {
      output: "json",
      input: query,
      inputtype: "textquery",
      key: API_KEY,
    },
  });
};

module.exports = {
  search,
};
