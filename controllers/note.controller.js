const Note = require('../models/Note');

const controllers = {
  addNote: async (req, res) => {
    try {
      const addNote = await new Note({
        text: req.body.text,
        userId: req.params.id
      })
      await addNote.save();
      res.status(201).json({ message: "Комментарий добавлен" })
    } catch (e) {
      console.log(e.message)
    }
  },
  getNoteById: async (req, res) => {
    try {
      const getNoteById = await Note.findById(req.params.id)
      res.status(201).json({ message: "Комментарии" })
    } catch (e) {
      console.log(e.message)
    }
  },
  getAllNote: async (req, res) => {
   try {
     const getAllNotes = await Note.find();
     res.status(201).json({ message: "Комментарии получены" })
   } catch (e) {
     console.log(e.message)
   }
  },
  patchNote: async (req, res) => {
    try {
      const id = req.params.id;
      const {text} = req.body;
      const options = {new: true}
      const patchNote = await Note.findByIdAndUpdate(id, {text},options);
      res.status(201).json({ message: "Комментарий изменен" })
    } catch (e) {
      console.log(e.message)
    }
  },
  deleteNote: async (req, res) => {
    try {
      const deleteNote = await Note.findByIdAndDelete(req.params.id)
      res.status(201).json({ message: "Комментарий удален" })
    } catch (e) {
      console.log(e.message)
    }
  }
}