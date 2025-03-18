const multer = require("multer");

const file_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let f_name = Date.now() + "_" + file.originalname;
    cb(null, f_name);
  },
});

const file_type = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/webp" ||
    file.mimetype == "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("file type not supported");
  }
};

const upload = multer({ storage: file_storage, fileFilter: file_type });
module.exports = upload;
