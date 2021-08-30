const { firestore } = require("./db");

const cols = {
  users: firestore.collection("users"),
  landmarks: firestore.collection("landmarks"),
};

const addUser = async (user) => {
  return cols.users.doc().set(JSON.parse(JSON.stringify(user)));
};

const getUsers = async (query, size) => {
  if (size) {
    let nextQueryId = null;
    let next = null;
    if (!query) {
      next = cols.users.orderBy("queryId").limit(parseInt(size));
    } else {
      next = cols.users
        .orderBy("queryId")
        .startAfter(query)
        .limit(parseInt(size));
    }
    const nextQuery = await next.get();
    const len = nextQuery.docs.length - 1;
    if (!nextQuery.empty) {
      nextQueryId = nextQuery.docs[len].data().queryId;
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
};
