const auth = require("../firebase/auth");
const dbService = require("../firebase/firestore-service");

const Status = require("../constants/status");
const Validator = require("../validator");
const User = require("../models/user");
const catchErrors = require("../utils/catchErrors");

const validateSignUp = [Validator.emailValidator, Validator.passwordValidator];

const validateUsersList = [
  Validator.pageValidator,
  Validator.pageSizeValidator,
];

const addUser = catchErrors(async (req, res, next) => {
  const response = await auth.signUp(req.body.email, req.body.password);
  await dbService.addUser(new User(req.body.email, response.data.localId));
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      message: "User added successfully!",
      data: {
        email: response.data.email,
        token: response.data.idToken,
      },
    },
  });
});

const getUsersList = catchErrors(async (req, res, next) => {
  const arrayResults = await dbService.getUsers(
    req.query.query,
    req.query.size
  );
  const nextQuery = arrayResults[0];
  const snapshot = await arrayResults[1];
  const users = [];
  snapshot.forEach((doc) => {
    if (typeof doc.data() !== "undefined" || doc.data()) {
      const user = doc.data();
      delete user.queryId;
      users.push(user);
    }
  });
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      query: nextQuery,
      users: users,
    },
  });
});

module.exports = {
  addUser,
  getUsersList,
  validateSignUp,
  validateUsersList,
};
