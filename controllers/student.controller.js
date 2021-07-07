const httpStatus = require('http-status')
const Student = require("../models/Student.model.js");

module.exports.studentsController = {
  postStudent: async (req, res) => {
    const {firstName, lastName, patronymic, avatar} = req.body;
    if (!firstName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо указать имя нового студента',
      });
    }
    if (!lastName) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо указать фамилию нового студента',
      });
    }
    if (!patronymic) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо указать отчество нового студента',
      });
    }
    if (!avatar) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо указать ссылку на аватарку',
      });
    }
    try {
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
      if (!getStudent) {
        return res.status(httpStatus.BAD_REQUEST).json({
          error: 'Студент с таким ID не найден',
        })
      }
      res.json(getStudent);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const deleteStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deleteStudent) {
        return res.json({
          message: 'Не удалось удалить студента. Укажите верный ID',
        });
      }
      res.json(deleteStudent);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({ error: e.message })
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
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
};


