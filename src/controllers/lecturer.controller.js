const Lecturer = require("../models/lecturer.model");
const { generateOTP, isOtpExpired } = require("../utils/otp.util");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");
const { sendOtp } = require("../services/email.service");
const sessionUtil = require("../utils/session.util");

const AuthOtp = require("../models/AuthOtp.model");

const requestOtp = async (req, res) => {
  try {
    const lecturer = await Lecturer.findOne({ email: req.body.email })
      .populate("module")
      .populate("university")
      .populate("course");
    if (!lecturer) {
      return new ErrorResponse(res).notFound("Lecturer not found");
    }

    const authOtp = await AuthOtp.findOne({ uid: lecturer._id });
    if (authOtp) {
      await AuthOtp.findByIdAndDelete(authOtp._id);
    }

    const freshOtp = await AuthOtp.create({
      otp: generateOTP(6),
      uid: lecturer._id,
    });

    await sendOtp(lecturer.email, lecturer.name, freshOtp.otp);

    return new SuccessResponse(res).ok(
      { lecturer: lecturer },
      "OTP sent to the email " + lecturer.email
    );
  } catch (error) {
    return new ErrorResponse(res).internalServerError(error.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const authOtp = await AuthOtp.findOne({
      uid: req.body.id,
      otp: req.body.otp,
    });
    if (!authOtp) {
      return new ErrorResponse(res).badRequest(
        "Wrong otp or have not requested otp yet"
      );
    }
    const isExpired = isOtpExpired(authOtp.createdAt);
    if (isExpired) {
      await AuthOtp.findByIdAndDelete(req.body.id);
      return new ErrorResponse(res).badRequest("OTP expired");
    }

    await AuthOtp.findByIdAndDelete(authOtp._id);

    const lecturer = await Lecturer.findById(req.body.id)
      .populate("university")
      .populate("course")
      .populate("module");
    const accessToken = sessionUtil.sign(
      new sessionUtil.Payload(
        lecturer._id,
        lecturer.email,
        lecturer.name,
        "LECTURER"
      )
    );

    return new SuccessResponse(res).ok(
      {
        accessToken: accessToken,
        lecturer: lecturer,
      },
      "OTP verified successfully"
    );
  } catch (error) {
    return new ErrorResponse(res).internalServerError(error.message);
  }
};

const createLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.create(req.body);
    return new SuccessResponse(res).created(lecturer);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getLecturers = async (req, res) => {
  try {
    const query = req.query;
    const lecturers = await Lecturer.find(query)
      .populate("university")
      .populate("module")
      .populate("course");
    return new SuccessResponse(res).ok(lecturers);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    return new SuccessResponse(res).ok(lecturer);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(lecturer);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteLecturer = async (req, res) => {
  try {
    await Lecturer.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
  createLecturer,
  getLecturers,
  getLecturer,
  updateLecturer,
  deleteLecturer,
};
