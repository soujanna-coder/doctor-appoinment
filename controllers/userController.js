const db = require("../models");
const { Sequelize, DataTypes, Op } = require("sequelize");
// create main model
const User = db.user;
const OTPVerification = db.otpVerification;
const { generateOTP } = require("../otpUtils");
const axios = require("axios");

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwNDg0IDUiLCJuYmYiOjE2OTMwMzgxNDIsImV4cCI6MTcyNDU3NDE0MiwiaWF0IjoxNjkzMDM4MTQyLCJpc3MiOiJodHRwczovL2J1bGtzbXMuYnNubC5pbjo1MDEwIiwiYXVkIjoiMTA0ODQgNSJ9.3zzhR-D2kYV4pWhEdX2QlRtuZkGSNn3AuAGj-DKoED0";
const url = "https://bulksms.bsnl.in:5010/api/Send_SMS";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${bearerToken}`,
};
// create product
const sendOTP = async (req, res) => {
  const { mobile_number } = req.body;

  try {
    // Find the user by mobile number
    let user = await User.findOne({ where: { mobile_number } });

    if (!user) {
      user = await User.create({
        mobile_number: mobile_number,
        name: "New User", // You can modify this to allow users to provide their names during registration
        email: "", // You can modify this to allow users to provide their emails during registration
      });
    }

    // Generate a 4-digit OTP
    // const otp = "1234";
    const otp = generateOTP(4);
    const data = {
      Header: "PSYREG",
      Target: mobile_number,
      Is_Unicode: "0",
      Is_Flash: "0",
      Message_Type: "SI",
      Entity_Id: "1401536610000064172",
      Content_Template_Id: "1407169228448952208",
      Consent_Template_Id: "",
      Template_Keys_and_Values: [
        {
          Key: "var",
          Value: otp,
        },
      ],
    };
    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || "An error occurred");
      });
    // Get the current timestamp and the timestamp 5 minutes from now
    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + 5 * 60000);

    // Store the OTP in the OTPVerification table
    await OTPVerification.create({
      user_id: user.user_id,
      otp_code: otp,
      otp_expires_at: expiryTime,
    });

    // You can send the OTP to the user's mobile number here (e.g., via SMS)

    return res.json({
      status: 200,
      message: "OTP sent successfully.",
      data: null,
    });
  } catch (err) {
    console.error("Error storing OTP in the database:", err);
    res.json({ status: 500, message: "Failed to send OTP." });
  }
};

const login = async (req, res) => {
  const { mobile_number, otp } = req.body;

  try {
    // Find the user by mobile number
    const user = await User.findOne({ where: { mobile_number } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the provided OTP is valid for the given user and has not expired
    const otpVerification = await OTPVerification.findOne({
      where: {
        user_id: user.user_id,
        otp_code: otp,
        otp_expires_at: { [Op.gt]: new Date() },
      },
    });

    if (!otpVerification) {
      return res
        .status(401)
        .json({ message: "Invalid OTP or OTP has expired." });
    }

    // The OTP is valid; you can log the user in here
    return res.json({ status: 200, message: "Login successful!", data: user });
  } catch (err) {
    console.error("Error validating OTP:", err);
    return res.json({ status: 500, message: "Failed to validate OTP." });
  }
};

const resendOTP = async (req, res) => {
  const { mobile_number } = req.body;

  try {
    // Find the user by mobile number
    const user = await User.findOne({ where: { mobile_number } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a new 4-digit OTP
    // const otp = "1234";
    const otp = generateOTP(4);

    const data = {
      Header: "PSYREG",
      Target: mobile_number,
      Is_Unicode: "0",
      Is_Flash: "0",
      Message_Type: "SI",
      Entity_Id: "1401536610000064172",
      Content_Template_Id: "1407169228448952208",
      Consent_Template_Id: "",
      Template_Keys_and_Values: [
        {
          Key: "var",
          Value: otp,
        },
      ],
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || "An error occurred");
      });
    // Get the current timestamp and the timestamp 5 minutes from now
    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + 5 * 60000);

    // Store the new OTP in the OTPVerification table
    await OTPVerification.create({
      user_id: user.user_id,
      otp_code: otp,
      otp_expires_at: expiryTime,
    });

    // You can send the new OTP to the user's mobile number here (e.g., via SMS)
    console.log("New OTP sent successfully:", otp);
    res.json({ status: 200, message: "New OTP sent successfully." });
  } catch (err) {
    console.error("Error resending OTP:", err);
    return res.json({ status: 500, message: "Failed to resend OTP." });
  }
};

module.exports = {
  sendOTP,
  login,
  resendOTP,
};
