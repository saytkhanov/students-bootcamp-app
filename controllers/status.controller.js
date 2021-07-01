const Status = require('../models/Status');

const controllers = {
  addStatus: async (req, res) => {
    const addStatus = await new Status({
      type: req.body.type,
      userId: req.params.id
    })
    await addStatus.save()
    res.status(201).json({ message: "Cтатус добавлен" })
  },
  patchStatus: async (req, res) => {
    const id = req.params.id;
    const {type} = req.body.type;
    const options = {new: true}
    const patchStatus = await Status.findByIdAndUpdate(id, {type}, options)
    await patchStatus.save();
    res.status(201).json({ message: "Cтатус изменен" })
  }
}