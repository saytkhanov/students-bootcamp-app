const { Router } = require("express");
const router = Router();
const {
  notesController,
} = require('../controllers/note.controller')

router.get("/student/status/note", notesController.getAllNote);
router.get("/student/:id/notes", notesController.getNoteById);
router.post("/student/:id/note", notesController.addNote);
router.delete("/note/:id", notesController.deleteNote);
router.patch("/note/:id", notesController.patchNote);

module.exports = router;
