const { Schema, model, Types } = require("mongoose");

const noteSchema = new Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);
module.exports = Note;
