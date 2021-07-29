const { Router } = require("express");
const router = Router();
const {
  studentsController,
} = require('../controllers/student.controller')

router.get("/all", studentsController.getAllStudents);
router.post("/student", studentsController.postStudent);
router.get("/student/:id", studentsController.getStudentById);
router.delete("/student/:id", studentsController.deleteStudent);
router.patch("/student/:id", studentsController.patchStudent);

module.exports = router;
