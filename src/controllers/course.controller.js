const Course = require("../models/Course.model");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    return new SuccessResponse(res).created(course);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getCourses = async (req, res) => {
  try {
    const query = req.query;
    const courses = await Course.find(query).populate("university");
    return new SuccessResponse(res).ok(courses);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    return new SuccessResponse(res).ok(course);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(course);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
