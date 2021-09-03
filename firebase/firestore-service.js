const { firestore } = require("./db");
const catchErrors = require("../utils/catchErrors");
const cols = {
  users: firestore.collection("users"),
  landmarks: firestore.collection("landmarks"),
  admins: firestore.collection("admins"),
};

const addUser = async (user) => {
  return cols.users.doc().set(JSON.parse(JSON.stringify(user)));
};

const isAdmin = async (email) => {
  const querySnapshot = await cols.admins.where("email", "==", email).get();
  return querySnapshot.size > 0;
};

const getUsers = async (query, size) => {
  if (size) {
    let nextQueryId = null;
    let next = null;
    if (!query) {
      next = cols.users.orderBy("id").limit(parseInt(size));
    } else {
      next = cols.users
        .orderBy("id")
        .startAfter(query)
        .limit(parseInt(size));
    }
    const nextQuery = await next.get();
    const len = nextQuery.docs.length - 1;
    if (!nextQuery.empty) {
      nextQueryId = nextQuery.docs[len].data().id;
    }
    return [nextQueryId, next.get()];
  } else {
    return [null, cols.users.get()];
  }
};

const addLandmark = async (landmark) => {
  return cols.landmarks.doc().set(JSON.parse(JSON.stringify(landmark)));
};

module.exports = {
  addUser,
  getUsers,
  addLandmark,
  isAdmin,
};
