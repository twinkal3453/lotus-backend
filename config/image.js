import multer from "multer";
import path from "path";
import crypto from "crypto";

// Include the node file module
import fs from "fs";

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(
        null,
        "" + raw.toString("hex") + path.extname(file.originalname)
      );
    });
  },
});

var upload = multer({ storage: storage });
// console.log('upload :  ', upload);
export default upload;
