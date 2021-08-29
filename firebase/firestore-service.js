const firestore = require("./db");

const cols = {
  users: firestore.collection("users"),
};

const addUser = async (user) => {
  return cols.users.doc().set(JSON.parse(JSON.stringify(user)));
};

module.exports = {
  addUser,
};
