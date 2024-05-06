const mongoose = require("mongoose");
const { serverConfig } = require("../../config/environment_variables");

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  displayImage: {
    type: String,
    default: `http://localhost:${serverConfig.port}/static/factory.png`,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("University", universitySchema);
