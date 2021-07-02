const { Router } = require("express");
const router = Router();

router.use(require("./status.route"));
router.use(require("./student.route"));
router.use(require("./note.route"));

module.exports = router;
