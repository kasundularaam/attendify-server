const Attendance = require("../models/Attendance.model");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    return new SuccessResponse(res).created(attendance);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};
const getAttendances = async (req, res) => {
  try {
    const query = req.query;
    const attendances = await Attendance.find(query)
      .populate("university")
      .populate("course")
      .populate("module")
      .populate("lecturer")
      .populate("student");
    return new SuccessResponse(res).ok(attendances);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    return new SuccessResponse(res).ok(attendance);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return new SuccessResponse(res).ok(attendance);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  createAttendance,
  getAttendances,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};
