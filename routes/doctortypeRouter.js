const router = require("express").Router();
const doctorTypeController = require("../controllers/doctorTypeController.js");
router.post("/doctor-type-enter", doctorTypeController.doctorTypeEnter);
router.get("/all-doctor-type", doctorTypeController.allDoctorType);
router.put(
  "/doctor-type-update/:type_id",
  doctorTypeController.allDoctorTypeUpdate
);
router.delete(
  "/doctor-type-delete/:type_id",
  doctorTypeController.doctorTypeDelete
);

module.exports = router;
