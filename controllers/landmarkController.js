const Status = require("../constants/status");
const ErrorUtils = require("../utils/error-utils");
const Validator = require("../validator");
const service = require("../places/places-service");
const firestoreService = require("../firebase/firestore-service");

const Landmark = require("../models/landmark");

const validateSearch = [Validator.searchValidator];

const validateLandmark = [
  Validator.landmarkNameValidator,
  Validator.latValidator,
  Validator.longValidator,
  Validator.addressValidator,
];

const search = async (req, res) => {
  const errors = ErrorUtils.handleErrors(req);
  if (errors.length > 0) {
    throwUserError(errors, res);
  } else {
    const query = req.query.search;
    try {
      const response = await service.search(query);
    } catch (error) {
      throwServerError(error, res);
    }
  }
};

const addLandmark = async (req, res) => {
  const errors = ErrorUtils.handleErrors(req);
  if (errors.length > 0) {
    throwUserError(errors, res);
  } else {
    try {
      let landmark = new Landmark();
      landmark = {
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address,
        desc: req.body.desc,
      };
      if (req.files.image) {
      } else {
        try {
          const response = await addToFirestore(landmark);
          res.status(200).json({
            status: Status.SUCCESS,
            data: {},
          });
        } catch (error) {
          throwServerError(error, res);
        }
      }
    } catch (error) {
      throwServerError(error, res);
    }
  }
};

const throwUserError = (errors, res) => {
  res.status(422).json({
    status: Status.FAILED,
    data: {
      errors: errors,
    },
  });
};

const throwServerError = (error, res) => {
  res.status(500).json({
    status: Status.FAILED,
    data: error,
  });
};

const addToFirestore = (landmark) => {
  return firestoreService.addLandmark(landmark);
};

module.exports = {
  validateSearch,
  search,
  validateLandmark,
  addLandmark,
};
