const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController.js");
router.post("/create-appointments", appointmentController.createAppointment);
router.get(
  "/all-appointments-details",
  appointmentController.getAllAppointments
);
router.get(
  "/appointments-details/:appointment_id",
  appointmentController.getAppointmentById
);
router.put(
  "/appointments-details/:appointment_id",
  appointmentController.updateAppointment
);
router.delete(
  "/appointments-delete/:appointment_id",
  appointmentController.deleteAppointment
);
router.get(
  "/user-appointments-details/:user_id",
  appointmentController.userAllGetAppointmentById
);

module.exports = router;
