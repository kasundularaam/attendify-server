const Lecture = require("../models/Lecture.model");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    return new SuccessResponse(res).created(lecture);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getLectures = async (req, res) => {
  try {
    const query = req.query;
    const lectures = await Lecture.find(query)
      .populate("university")
      .populate("course")
      .populate("batch")
      .populate("module")
      .populate("lecturer");
    return new SuccessResponse(res).ok(lectures);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    return new SuccessResponse(res).ok(lecture);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(lecture);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteLecture = async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  createLecture,
  getLectures,
  getLecture,
  updateLecture,
  deleteLecture,
};
