const admin = require("../firebase/admin");
const catchErrors = require("../utils/catchErrors");
const auth = require("../firebase/auth");

const Status = require("../constants/status");

const Validator = require("../validator");

const uidValidator = Validator.userIdValidator;

const refreshToken = catchErrors(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const refreshResponse = await auth.refreshToken(refreshToken);
  console.log(refreshResponse.data.id_token);
  res
    .cookie("token", refreshResponse.data.id_token)
    .cookie("refreshToken", refreshResponse.data.refresh_token)
    .status(200)
    .json({
      status: Status.SUCCESS,
    });
});

module.exports = {
  refreshToken,
  uidValidator,
};
