const Batch = require("../models/Batch.model");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const createBatch = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    return new SuccessResponse(res).created(batch);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getBatches = async (req, res) => {
  try {
    const query = req.query;
    const batches = await Batch.find(query).populate("university");
    return new SuccessResponse(res).ok(batches);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    return new SuccessResponse(res).ok(batch);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(batch);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteBatch = async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  createBatch,
  getBatches,
  getBatch,
  updateBatch,
  deleteBatch,
};
