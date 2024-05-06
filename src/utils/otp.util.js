function generateOTP(length) {
  const charset = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }

  return otp;
}

function isOtpExpired(otpCreatedAt) {
  const otpExpiresAt = new Date(otpCreatedAt);
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 5);

  const now = new Date();
  return now > otpExpiresAt;
}

module.exports = { generateOTP, isOtpExpired };
