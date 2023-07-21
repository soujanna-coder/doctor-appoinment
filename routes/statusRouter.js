const router = require("express").Router();
const statusController = require("../controllers/statusController.js");
router.post("/newstatus", statusController.newStatusEnter);
router.get("/allStatus", statusController.allStatus);
router.put("/status-update/:status_id", statusController.statusUpdate);
router.delete("/status-delete/:status_id", statusController.statusDelete);

module.exports = router;
