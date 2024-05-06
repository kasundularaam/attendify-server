const mongoose = require("mongoose");

const authOtpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("AuthOtp", authOtpSchema);
