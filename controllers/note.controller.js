const Note = require("../models/Note");

const controllers = {
  getAllNote: async (req, res) => {
    try {
      const getAllNote = await Note.find().populate("student");
      res.status(201).json(getAllNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  addNote: async (req, res) => {
    try {
      const addNote = await new Note({
        text: req.body.text,
        student: req.params.id,
      });
      await addNote.save();
      res.status(201).json(addNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  getNoteById: async (req, res) => {
    try {
      const getNoteById = await Note.find({ student: req.params.id });
      res.status(201).json(getNoteById);
    } catch (e) {
      console.log(e.message);
    }
  },
  patchNote: async (req, res) => {
    try {
      const id = req.params.id;
      const { text } = req.body;
      const options = { new: true };
      const patchNote = await Note.findByIdAndUpdate(id, { text }, options);
      res.status(201).json(patchNote);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteNote: async (req, res) => {
    try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id);
      res.status(201).json(deleteNote);
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = controllers;
