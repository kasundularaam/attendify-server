const mongoose = require("mongoose");
const { serverConfig } = require("../../config/environment_variables");

const lecturerSchema = new mongoose.Schema({
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  displayImage: {
    type: String,
    default: `http://localhost:${serverConfig.port}/static/employee.png`,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
