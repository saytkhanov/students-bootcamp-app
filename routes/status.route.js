const { Router } = require("express");
const router = Router();
const {
  statusController,
} = require('../controllers/status.controller')

router.get("/statuses", statusController.getStatuses);
router.post("/status", statusController.addStatus);
router.patch("/status/:id", statusController.patchStatus);

module.exports = router;
