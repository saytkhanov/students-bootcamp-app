const Student = require('../models/Student')

const controller = {
  postStudent: async (req, res) => {
    try {
      const student = await new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        patronymic: req.body.patronymic
      })
      await student.save();
      res.status(201).json({ message: "Студент добавлен" })
    } catch (e) {
      console.log(e.message)
    }
  },
  getAllStudents: async (req, res) => {
    try {
      const allStudents  = await Student.find().populate("notes").populate("status");
      res.status(201).json({ message: "Данные получены" })
    } catch (e) {
      console.log(e.message)
    }
  }
}
