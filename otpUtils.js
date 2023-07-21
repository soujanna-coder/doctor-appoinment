// otpUtils.js
// Function to generate a random numeric OTP of the specified length
function generateOTP(length) {
  const chars = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    otp += chars[index];
  }
  return otp;
}

module.exports = { generateOTP };
