const { Router } = require("express");
const router = Router();
const {
  addStatus,
  patchStatus,
  getStatuses,
} = require("../controllers/status.controller");

router.get("/status", getStatuses);
router.post("/status", addStatus);
router.patch("/status/:id", patchStatus);

module.exports = router;
