const Module = require("../models/Module.model");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    return new SuccessResponse(res).created(module);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getModules = async (req, res) => {
  try {
    const query = req.query;
    const modules = await Module.find(query)
      .populate("university")
      .populate("course");
    return new SuccessResponse(res).ok(modules);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    return new SuccessResponse(res).ok(module);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(module);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
};
