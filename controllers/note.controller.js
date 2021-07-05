const Note = require("../models/Note.model.js");

module.exports.notesController = {
  getAllNote: async (req, res) => {
    try {
      const getAllNote = await Note.find();
      res.json(getAllNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  addNote: async (req, res) => {
    try {
      const {text, status, student} = req.body
      const addNote = await new Note({
        text, status, student
      });
      await addNote.save();
      res.json(addNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  getNoteById: async (req, res) => {
    try {
      const getNoteById = await Note.find({ student: req.params.id });
      res.json(getNoteById);
    } catch (e) {
      console.log(e.message);
    }
  },
  patchNote: async (req, res) => {
    try {
      const id = req.params.id;
      const { text, status } = req.body;
      const options = { new: true };
      const patchNote = await Note.findByIdAndUpdate(id, { text, status }, options);
      res.json(patchNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteNote: async (req, res) => {
    try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id);
      res.json(deleteNote);
    } catch (e) {
      console.log(e.message);
    }
  },
};


