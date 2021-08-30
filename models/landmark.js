const { v4 } = require("uuid");

module.exports = class Landmark {
  name = "";
  lat = "";
  lng = "";
  address = "";
  desc = "";
  images = [];
  id = v4();
};
