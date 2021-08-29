const firestore = require("./db");

const cols = {
  users: firestore.collection("users"),
};

const addUser = async (user) => {
  // return cols.users.doc().set(JSON.parse(JSON.stringify(user)));
  const ref = cols.users.doc();
  user.id = ref.id;
  return ref.set(JSON.parse(JSON.stringify(user)));
};

const getUsers = async (page, size) => {
  if (page && size) {
    console.log("Page and size is not null");
  } else {
    return cols.users.get();
  }
};

module.exports = {
  addUser,
  getUsers,
};
