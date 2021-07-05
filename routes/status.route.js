const { Router } = require("express");
const router = Router();
const {
  statusController,
} = require('../controllers/status.controller')

router.get("/status", statusController.getStatuses);
router.post("/status", statusController.addStatus);
router.patch("/status/:id", statusController.patchStatus);

module.exports = router;
