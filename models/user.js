// import { v4 as uuidv4 } from 'uuid';
const { v4 } = require("uuid");

module.exports = class User {
  email = "";
  id = "";
  queryId = v4();
  // name = ''
  constructor(email, id) {
    this.email = email;
    this.id = id;
  }
};
