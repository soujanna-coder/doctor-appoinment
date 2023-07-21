const multer = require("multer");
const path = require("path");
// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage: storage });

// Set up a route to handle file upload
upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.send("File uploaded successfully");
  };

module.exports = {
  upload,
};
