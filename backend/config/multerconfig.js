const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Keep the original filename and extension
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }); 

const uploadProductImages = upload.array("images", 5);
module.exports = uploadProductImages;
