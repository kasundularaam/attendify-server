const { emailConfig } = require("../../config/environment_variables");
const emailTemplate = require("../../templates/auth_otp_email.template");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: emailConfig.host,
  auth: {
    user: emailConfig.hostEmail,
    pass: emailConfig.password,
  },
});

const sendOtp = async (employeeEmail, employeeName, otp) => {
  try {
    const mailOptions = emailTemplate(employeeEmail, employeeName, otp);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendOtp };
