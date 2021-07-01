const Note = require('../models/Note');

const controllers = {
  addNote: async (req, res) => {
    const addNote = await new Note({
       text: req.body.text,
       userId: req.params.id
    })
    await addNote.save();
    res.status(201).json({ message: "Комментарий добавлен" })
  }
}