const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const Appointment = db.appointment;

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
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
module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  userAllGetAppointmentById,
};
