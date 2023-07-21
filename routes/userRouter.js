// const productController = require("../controllers/productController.js");
const userController = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/sendOTP", userController.sendOTP);
router.post("/login", userController.login);
router.post("/resendOTP", userController.resendOTP);

module.exports = router;
