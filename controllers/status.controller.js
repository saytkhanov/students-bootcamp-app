const httpStatus = require('http-status')
const Status = require("../models/Status.model.js");

module.exports.statusController = {
  getStatuses: async (req, res) => {
    try {
      const allStatuses = await Status.find();
      res.json(allStatuses);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      })
    }
  },
  addStatus: async (req, res) => {
    const {status, color} = req.body;
    if (!status) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Необходимо указать статус',
      });
    }
    try {
      const addStatus = await new Status({
       status, color
      });
      await addStatus.save();
      res.json(addStatus);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
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
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
};


