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
      await dbService.addUser(new User(req.body.email));
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
  // const errors = ErrorUtils.handleErrors(req);
  // if (errors.length > 0) {
  //   res.status(422).json({
  //     status: Status.FAILED,
  //     data: {
  //       message: errors,
  //     },
  //   });
  // } else {

  // }
  try {
    const page = req.query.page;
    const size = req.query.size;
    const snapshot = await dbService.getUsers(page, size);
    const users = [];
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });
    res.status(200).json({
      status: Status.SUCCESS,
      data: users,
    });
  } catch (error) {
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
