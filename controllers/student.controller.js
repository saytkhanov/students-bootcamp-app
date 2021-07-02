const Student = require("../models/Student");

const controllers = {
  postStudent: async (req, res) => {
    try {
      const student = await new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        patronymic: req.body.patronymic,
        status: req.params.id,
      });
      await student.save();
      res.status(201).json({ message: "Студент добавлен" });
    } catch (e) {
      console.log(e.message);
    }
  },
  getAllStudents: async (req, res) => {
    try {
      const allStudents = await Student.aggregate([
        {
          $lookup: {
            from: "notes",
            as: "notes",
            let: { student: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$student", "$$student"] } } },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            patronymic: 1,
            notes: 1,
          },
        },
      ]);
      res.status(201).json(allStudents);
    } catch (e) {
      console.log(e.message);
    }
  },
  getStudentById: async (req, res) => {
    try {
      const getStudent = await Student.findById(req.params._id);
      res.status(201).json(getStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const deleteStudent = await Student.findByIdAndDelete(req.params._id);
      res.status(201).json(deleteStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
  patchStudent: async (req, res) => {
    try {
      const { firstName, lastName, patronymic } = req.body;
      const id = req.params._id;
      const options = { new: true };
      const patchStudent = await Student.findByIdAndUpdate(
        id,
        { firstName, lastName, patronymic },
        options
      );
      res.status(201).json(patchStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = controllers;
