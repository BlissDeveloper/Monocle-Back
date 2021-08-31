const service = require("../places/places-service");
const firestoreService = require("../firebase/firestore-service");

const Landmark = require("../models/landmark");

const Validator = require("../validator");
const catchErrors = require("../utils/catchErrors");

const validateSearch = [Validator.searchValidator];
const validateLandmark = [
  Validator.landmarkNameValidator,
  Validator.latValidator,
  Validator.longValidator,
  Validator.addressValidator,
];

// const search = catchErrors(async (req, res) => {
//   const errors = ErrorUtils.handleErrors(req);
//   if (errors.length > 0) {
//     throwUserError(errors, res);
//   } else {
//     const response = await service.search(req.query.search);
//   }
// });

const addLandmark = catchErrors(async (req, res, next) => {
  const landmark = {
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    desc: req.body.desc,
  };
  if (req.files.image) {
  } else {
    await addToFirestore(landmark);
    res.status(200).json({
      status: Status.SUCCESS,
      data: {},
    });
  }
});

const addToFirestore = (landmark) => {
  return firestoreService.addLandmark(landmark);
};

module.exports = {
  validateSearch,
  search,
  validateLandmark,
  addLandmark,
};
