const { Router } = require("express");
const router = Router();
const {
  addNote,
  getAllNote,
  getNoteById,
  patchNote,
  deleteNote,
} = require("../controllers/note.controller");

router.get("/student/status/note", getAllNote);
router.get("/student/:id/note", getNoteById);
router.post("/student/:id/note", addNote);
router.delete("/note/:id", deleteNote);
router.patch("/note/:id", patchNote);

module.exports = router;
