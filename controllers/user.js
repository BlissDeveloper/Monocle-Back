const auth = require("../firebase/auth");
const dbService = require("../firebase/firestore-service");
const { check } = require("express-validator");
const Status = require("../constants/status");
const ErrorUtils = require("../utils/error-utils");
const Validator = require("../validator");
const User = require("../models/user");

const validateSignUp = [Validator.emailValidator, Validator.passwordValidator];

const addUser = async (req, res) => {
  const errors = ErrorUtils.handleErrors(req);
  if (errors.length > 0) {
  } else {
    try {
      const response = await auth.signUp(req.body.email, req.body.password);
      const dbRes = await dbService.addUser(new User(req.body.email));
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
      console.log(error)
      res.status(422).json({
        status: Status.FAILED,
        data: {
          error: error,
        },
      });
    }
  }
};

module.exports = {
  addUser,
  validateSignUp,
};
