const { Types } = require("mongoose");
const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
  {
    status: {
      type: String,
      default: "Зачислен",
    },
    color: {
      type: String,
      default: "grey",
    },
    // student: {
    //   type: Types.ObjectId,
    //   ref: 'Student'
    // }
  },
  {
    timestamps: true,
  }
);

const Status = model("Status", statusSchema);

module.exports = Status;
