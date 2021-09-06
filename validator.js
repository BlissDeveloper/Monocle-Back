const { check, query, body } = require("express-validator");
const firestoreService = require("./firebase/firestore-service");
const admin = require("./firebase/admin");

const adminValidator = check("email")
  .custom((val) => {
    
    return firestoreService.isAdmin(val).then((isAdmin) => {
      
      if (!isAdmin) {
        return Promise.reject("");
      } else {
        return Promise.resolve();
      }
    });
  })
  .withMessage("You are not authorized to login.")
  .bail();

const userIdValidator = check("userId")
  .notEmpty()
  .withMessage("userId is required")
  .bail()
  .custom((val) => {
    return admin.checkUidExistence(val).then((userRecord) => {
      if (userRecord !== null) {
        return Promise.resolve();
      } else {
        return Promise.reject("");
      }
    });
  })
  .withMessage("User ID does not exist.");

const emailValidator = check("email")
  .notEmpty()
  .withMessage("Email is required.")
  .bail()
  .isEmail()
  .withMessage("Invalid email format.");

const passwordValidator = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .bail()
  .isLength({ min: 8 })
  .withMessage("Password must be atleast 8 characters");

const searchValidator = query("query")
  .notEmpty()
  .withMessage("Search query is required.");

const landmarkNameValidator = check("name")
  .notEmpty()
  .withMessage("Name is required.");

const latValidator = check("lat")
  .notEmpty()
  .withMessage("Latitude is required.")
  .bail()
  .isNumeric()
  .withMessage("Invalid latitude.");

const longValidator = check("lng")
  .notEmpty()
  .withMessage("Longitude is required.")
  .bail()
  .isNumeric()
  .withMessage("Invalid Longitude.");

const addressValidator = check("address")
  .notEmpty()
  .withMessage("Address is required.");

module.exports = {
  emailValidator,
  passwordValidator,
  searchValidator,
  landmarkNameValidator,
  latValidator,
  longValidator,
  addressValidator,
  adminValidator,
  userIdValidator,
};
