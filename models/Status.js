const { Types } = require('mongoose')
const {Schema, model} = require('mongoose');

const statusSchema = new Schema({
    type: {
      String
    },
    userId: {
      type: Types.ObjectId,
      ref: 'Student'
    }
  },
  {
    timestamps: true
  }
)

const Status = model('Status', statusSchema);

module.exports = Status