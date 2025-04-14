const multer = require("multer");
const path = require("path");

// Skapa en lagringskonfiguration för multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Spara filer i "uploads"-mappen
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikt filnamn
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
