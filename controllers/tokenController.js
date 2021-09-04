const admin = require("../firebase/admin");
const catchErrors = require("../utils/catchErrors");

const Status = require("../constants/status");

const Validator = require("../validator");

const uidValidator = Validator.userIdValidator;

const fetchToken = catchErrors(async (req, res, next) => {
  const token = await admin.generateToken(req.body.userId);
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      token: token,
    },
  });
});

module.exports = {
  fetchToken,
  uidValidator
};
