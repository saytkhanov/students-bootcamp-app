const Status = require("../models/Status.model.js");

const controllers = {
  getStatuses: async (req, res) => {
    const allStatuses = await Status.find();
    res.status(201).json(allStatuses);
  },
  addStatus: async (req, res) => {
    try {
      const addStatus = await new Status({
        status: req.body.status,
        color: req.body.color
      });
      await addStatus.save();
      res.status(201).json({ message: "Статус добавлен" });
    } catch (e) {
      console.log(e.message);
    }
  },
  patchStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status, color } = req.body.type;
      const options = { new: true };
      const patchStatus = await Status.findByIdAndUpdate(
        id,
        { status, color },
        options
      );
      await patchStatus.save();
      res.status(201).json({ message: "Статус изменен" });
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = controllers;
