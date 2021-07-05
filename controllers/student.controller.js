const Student = require("../models/Student.model.js");

module.exports.studentsController = {
  postStudent: async (req, res) => {
    try {
      const {firstName, lastName, patronymic, avatar} = req.body
      const student = await new Student({
        firstName, lastName, patronymic, avatar
      });
      await student.save();
      res.json(student);
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
          $lookup: {
            from: "notes",
            as: "lastNote",
            let: { student: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$student", "$$student"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            patronymic: 1,
            avatar: 1,
            notes: 1,
            lastNote: 1,
          },
        },
        { $unwind: { path: "$lastNote", preserveNullAndEmptyArrays: true } },
      ]);
      res.json(allStudents);
    } catch (e) {
      console.log(e.message);
    }
  },
  getStudentById: async (req, res) => {
    try {
      const getStudent = await Student.findById(req.params.id);
      res.json(getStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const deleteStudent = await Student.findByIdAndDelete(req.params.id);
      res.json(deleteStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
  patchStudent: async (req, res) => {
    try {
      const { firstName, lastName, patronymic } = req.body;
      const id = req.params.id;
      const options = { new: true };
      const patchStudent = await Student.findByIdAndUpdate(
        id,
        { firstName, lastName, patronymic },
        options
      );
      res.json(patchStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
};


