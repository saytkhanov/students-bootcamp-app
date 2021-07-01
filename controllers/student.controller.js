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
  },
  getStudentById: async (req, res) => {
    try {
      const getStudent = await Student.findById(req.params.id)
      res.status(201).json({ message: "Студент" })
    } catch (e) {
      console.log(e.message)
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const deleteStudent = await Student.findByIdAndDelete(req.params.id)
      res.status(201).json({ message: "Студен удалён" })
    } catch (e) {
      console.log(e.message)
    }
  }
}
