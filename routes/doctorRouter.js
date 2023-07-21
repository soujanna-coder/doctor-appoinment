const router = require("express").Router();
const doctorController = require("../controllers/doctorController.js");
router.post("/create-doctor", doctorController.createDoctorDetails);
router.get("/all-doctor-details", doctorController.getAllDoctorDetails);
router.get("/doctor-details/:doctor_id", doctorController.getDoctorDetailsById);
router.put("/doctor-details/:doctor_id", doctorController.updateDoctorDetails);
router.delete(
  "/doctor-delete/:doctor_id",
  doctorController.deleteDoctorDetails
);

module.exports = router;
