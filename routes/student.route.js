const { Router } = require("express");
const router = Router();
const {
  studentsController,
} = require('../controllers/student.controller')

router.get("/", studentsController.getAllStudents);
router.post("/", studentsController.postStudent);
router.get("/student/:id", studentsController.getStudentById);
router.delete("/student/:id", studentsController.deleteStudent);
router.patch("/student/:id", studentsController.patchStudent);

module.exports = router;
