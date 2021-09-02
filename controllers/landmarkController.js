const service = require("../places/places-service");
const firestoreService = require("../firebase/firestore-service");

const Status = require("../constants/status");
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

const search = catchErrors(async (req, res, next) => {
  const response = await service.search(req.query.search);
});

const addLandmark = catchErrors(async (req, res, next) => {
  const landmark = new Landmark();
  landmark.name = req.body.name;
  landmark.lat = parseFloat(req.body.lat);
  landmark.lng = parseFloat(req.body.lng);
  landmark.address = req.body.address;
  landmark.desc = req.body.desc;
  landmark.images = req.body.images;
  await firestoreService.addLandmark(landmark);
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      landmark: landmark,
    },
  });
});

module.exports = {
  validateSearch,
  search,
  validateLandmark,
  addLandmark,
};
