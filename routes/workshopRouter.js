const router = require("express").Router();
const workshopController = require("../controllers/workshopController.js");
router.post("/create-workshop", workshopController.createWorkshop);
router.get("/all-workshop-details", workshopController.getAllWorkshops);
router.get(
  "/workshop-details/:workshop_id",
  workshopController.getWorkshopById
);
router.put("/workshop-details/:workshop_id", workshopController.updateWorkshop);
router.delete(
  "/workshop-delete/:workshop_id",
  workshopController.deleteWorkshop
);

module.exports = router;
