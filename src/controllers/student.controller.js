const Student = require("../models/student.model");
const { generateOTP, isOtpExpired } = require("../utils/otp.util");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");

const AuthOtp = require("../models/AuthOtp.model");
const c = require("config");

const requestOtp = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
      return new ErrorResponse(res).notFound("Lecturer not found");
    }

    const authOtp = await AuthOtp.findOne({ uid: student._id });
    if (authOtp) {
      await AuthOtp.findByIdAndDelete(authOtp._id);
    }

    const freshOtp = await AuthOtp.create({
      otp: generateOTP(),
      uid: student._id,
    });

    await sendOtp(student.email, student.name, freshOtp.otp);

    return new SuccessResponse(res).ok(
      { student: student },
      "OTP sent to the email " + student.email
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

    const student = await Student.findById(req.body.id);

    const accessToken = sessionUtil.sign(
      new sessionUtil.Payload(
        student._id,
        student.email,
        student.name,
        "STUDENT"
      )
    );

    return new SuccessResponse(res).ok(
      {
        accessToken: accessToken,
        student: student,
      },
      "OTP verified successfully"
    );
  } catch (error) {
    return new ErrorResponse(res).internalServerError(error.message);
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return new SuccessResponse(res).created(student);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const query = req.query;
    const students = await Student.find(query)
      .populate("university")
      .populate("course")
      .populate("batch");
    return new SuccessResponse(res).ok(students);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    return new SuccessResponse(res).ok(student);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return new SuccessResponse(res).ok(student);
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    return new SuccessResponse(res).noContent();
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
