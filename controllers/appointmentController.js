const db = require("../models");
const nodemailer = require("nodemailer");
const { Sequelize, DataTypes, Op } = require("sequelize");
const base64Img = require("base64-img");
const Appointment = db.appointment;
const request = require("request");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "mail.psychaxis.com",
  port: 465,
  secure: true, // Set to true for SMTP over SSL
  auth: {
    user: "noreply@psychaxis.com",
    pass: "X-]iJr*2RL{g",
  },
});
// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    // Send confirmation email to the user
    convertImage(req.body);

    // Send confirmation email to the doctor
    res.json({
      status: 200,
      message: "Appointment created successfully!",
      appointment,
    });
  } catch (err) {
    console.error("Error creating appointment:", err);
    return res.json({
      status: 500,
      message: "Failed to create appointment.",
    });
  }
};

// Read all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json({ appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
};

// Read an appointment by appointment_id
const getAppointmentById = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.json({ appointment });
  } catch (err) {
    console.error("Error fetching appointment:", err);
    res.status(500).json({ message: "Failed to fetch appointment." });
  }
};

// Update an appointment by appointment_id
const updateAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    await appointment.update(req.body);
    res.json({
      status: 200,
      message: "Appointment updated successfully!",
      appointment,
    });
  } catch (err) {
    console.error("Error updating appointment:", err);
    return res.json({
      status: 500,
      message: "Failed to update appointment.",
    });
  }
};

// Delete an appointment by appointment_id
const deleteAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    await appointment.destroy();
    res.json({ message: "Appointment deleted successfully!" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({ message: "Failed to delete appointment." });
  }
};

const userAllGetAppointmentById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const specificUserId = user_id;
    console.log("Specific User ID:", specificUserId);
    const appointment = await Appointment.findAll({
      where: {
        user_id: specificUserId,
      },
      order: [["createdAt", "DESC"]],
    });
    if (!appointment) {
      return res.status(404).json({
        message: "user Appointment histroy not found.",
        data: appointment,
      });
    }

    return res.json({
      status: 200,
      message: "User Appointment History.",
      data: appointment,
    });
  } catch (err) {
    console.error("Error fetching appointment:", err);
    return res.json({
      status: 500,
      message: "Failed to fetch appointment.",
    });
  }
};

// Function to send confirmation email to the user
async function sendUserConfirmationEmail(userData) {
  console.log(base64Datastring);
  try {
    const emailContent = ` <!DOCTYPE html>
<html>
  <head>
    <title>Your Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      h2 {
        color: #007bff;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      .email-container {
        margin: 20px;
      }
      .logo {
        max-width: 150px; /* Set the maximum width of your logo */
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div>
        <img src="http://43.205.35.147:8080/images/logoTR.png"   class="logo" />
      </div>
      <h2>Your Booking is Confirmed</h2>
      <table>
        <tr>
          <th>Appointment Date</th>
          <td>${userData.appointment_date}</td>
        </tr>
        <tr>
          <th>Appointment Time</th>
          <td>${userData.appointment_time}</td>
        </tr>
        <tr>
          <th>Doctor Name</th>
          <td>${userData.doctor_name}</td>
        </tr>
        <tr>
          <th>Appointment Venue</th>
          <td>${userData.appointment_venue}</td>
        </tr>
        <tr>
          <th>Appointment Fees</th>
          <td>${userData.booking_amount}</td>
        </tr>
        <!-- Add more appointment details here -->
      </table>
    </div>
  </body>
</html>
    `;
    console.log(emailContent);
    const mailOptions = {
      from: "noreply@psychaxis.com",
      to: userData.email_id,
      subject: "Booking Confirmation",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent to user: ", info);
    return info;
  } catch (error) {
    console.error("Error sending confirmation email to user:", error);
  }
}
const imageUrl = "http://43.205.35.147:8080/images/logoTR.png";

// Function to convert the image to base64
function imageToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    request({ url: imageUrl, encoding: null }, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        reject(
          new Error(
            `Failed to fetch image. Status code: ${response.statusCode}`
          )
        );
      } else {
        const base64Data = Buffer.from(body).toString("base64");
        resolve(base64Data);
      }
    });
  });
}
let base64Datastring;
async function convertImage(userData) {
  try {
    base64Datastring = await imageToBase64(imageUrl);
    sendUserConfirmationEmail(userData);
    // console.log("Base64 encoded image data:\n", base64Datastring);
  } catch (err) {
    console.error("Error converting image to base64:", err);
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  userAllGetAppointmentById,
};
