const catchErrors = require("../utils/catchErrors");

const { v4: uuidv4 } = require("uuid");
const mimeType = require("mime-types");
const sharp = require("sharp");

const uploadFile = catchErrors(async (req, res, next) => {
  if (req.files) {
    const files = req.files.file;
    if (files !== null || typeof files === "undefined") {
      // bucket.upload('local/file/path', { destination: 'location/in/bucket' })
      if (!Array.isArray(files)) {
        const base64 = Buffer.from(files.data).toString("base64");
        const images = [base64];
        req.body.images = images;
        next();
      } else {
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

module.exports = uploadFile;
