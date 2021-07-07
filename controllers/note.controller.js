const httpStatus = require('http-status')
const Note = require("../models/Note.model.js");

module.exports.notesController = {
  getAllNote: async (req, res) => {
    try {
      const getAllNote = await Note.find();
      res.json(getAllNote);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  addNote: async (req, res) => {
    const {text, status} = req.body;
    if (!status) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо выбрать статус студента',
      });
    }
    try {
      const addNote = await new Note({
        text, status, student: req.params.id
      });
      await addNote.save();
      res.json(addNote);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  getNoteById: async (req, res) => {
    try {
      const getNoteById = await Note.find({ student: req.params.id });
      res.json(getNoteById);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  patchNote: async (req, res) => {
    const id = req.params.id;
    const { text, status } = req.body;
    const options = { new: true };
    try {
      const patchNote = await Note.findByIdAndUpdate(id, { text, status }, options);
      res.json(patchNote);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id);
      if (!deleteNote) {
        return res.json({
          message: 'Не удалось удалить запись. Укажите верный ID',
        });
      }
      return res.json({
        message: 'Запись успешно удалена',
      });
    } catch (e) {
      return res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ error: e.message });
    }
  },
};


