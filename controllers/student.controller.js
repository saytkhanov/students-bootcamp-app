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
      res.json(student)
    } catch (e) {
      console.log(e.message)
    }
  }
}
