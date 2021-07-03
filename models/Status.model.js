const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
  {
    status: {
      type: String,
      default: "Принят",
    },
    color: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

const Status = model("Status", statusSchema);

module.exports = Status;
