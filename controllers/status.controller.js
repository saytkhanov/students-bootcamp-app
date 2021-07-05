const Status = require("../models/Status.model.js");

module.exports.statusController = {
  getStatuses: async (req, res) => {
    try {
      const allStatuses = await Status.find();
      res.json(allStatuses);
    } catch (e) {
      console.log(e.message)
    }
  },
  addStatus: async (req, res) => {
    try {
      const {status, color} = req.body
      const addStatus = await new Status({
       status, color
      });
      await addStatus.save();
      res.json(addStatus);
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
      res.json(patchStatus);
    } catch (e) {
      console.log(e.message);
    }
  },
};


