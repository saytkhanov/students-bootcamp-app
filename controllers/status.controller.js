const Status = require('../models/Status');

const controllers = {
  addStatus: async (req, res) => {
    const addStatus = await new Status({
      type: req.body.type,
      userId: req.params.id
    })
    await addStatus.save()
    res.status(201).json({ message: "Cтатус добавлен" })
  }
}