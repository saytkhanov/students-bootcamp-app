const {Schema, model, Types } = require('mongoose');


const noteSchema = new Schema({
    text: {
      type: String
    },
    userStatus: {
      type: Types.ObjectId,
      ref: 'Student'
    }
  },
  {
    timestamps: true
  }
)

const Note = model('Note', noteSchema);
module.exports = Note