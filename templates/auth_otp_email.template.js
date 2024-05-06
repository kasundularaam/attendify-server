const { emailConfig } = require("../config/environment_variables");

const emailTemplate = (userEmail, userName, otp) => {
  const subject = "ATTENDIFY - One Time Password";

  const text = `Dear ${userName},
  
    Your One Time Password is ${otp}.
    this OTP is valid for 5 minutes.
  `;

  return {
    from: emailConfig.hostEmail,
    to: userEmail,
    subject: subject,
    text: text,
  };
};

module.exports = emailTemplate;
