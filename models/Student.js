const { Schema, model, Types } = require("mongoose");

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    patronymic: {
      type: String,
      required: true,
    },
    note: {
      type: Types.ObjectId,
      ref: "Note"
    },
    status: {
      type: Types.ObjectId,
      ref: "Status",
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;
