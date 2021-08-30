const auth = require("../firebase/auth");
const dbService = require("../firebase/firestore-service");
const Status = require("../constants/status");
const ErrorUtils = require("../utils/error-utils");
const Validator = require("../validator");
const User = require("../models/user");

const validateSignUp = [Validator.emailValidator, Validator.passwordValidator];
const validateUsersList = [
  Validator.pageValidator,
  Validator.pageSizeValidator,
];

const addUser = async (req, res) => {
  const errors = ErrorUtils.handleErrors(req);
  if (errors.length > 0) {
    res.status(422).json({
      status: Status.FAILED,
      data: {
        message: errors,
      },
    });
  } else {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(422).json({
        status: Status.FAILED,
        data: {
          error: error,
        },
      });
    }
  }
};

const getUsersList = async (req, res) => {
  try {
    const query = req.query.query;
    const pageSize = req.query.size;
    const arrayResults = await dbService.getUsers(query, pageSize);
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
  } catch (error) {
    console.log(error);
    res.status(422).json({
      status: Status.FAILED,
      data: {
        error: error,
      },
    });
  }
};

module.exports = {
  addUser,
  getUsersList,
  validateSignUp,
  validateUsersList,
};
