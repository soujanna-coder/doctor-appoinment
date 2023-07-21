const router = require("express").Router();
const doctorListController = require("../controllers/doctorListController.js");
router.get("/data", doctorListController.doctorList);

module.exports = router;
