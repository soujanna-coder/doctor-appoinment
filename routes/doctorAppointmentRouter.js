const router = require("express").Router();
const doctorAppointmentController = require("../controllers/doctorAppointmentController.js");
router.post(
  "/create-doctor-appointments",
  doctorAppointmentController.createAppointment
);

router.get(
  "/all-doctor-appointments",
  doctorAppointmentController.getAllAppointments
);
router.get(
  "/doctor-appointments-details/:doctor-appointments_id",
  doctorAppointmentController.getAppointmentById
);
router.put(
  "/doctor-appointments-details/:doctor-appointments_id",
  doctorAppointmentController.updateAppointment
);
router.delete(
  "/doctor-appointments-delete/:doctor_id",
  doctorAppointmentController.deleteAppointment
);

module.exports = router;
