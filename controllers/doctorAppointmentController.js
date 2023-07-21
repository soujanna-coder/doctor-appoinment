const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const DoctorAppointment = db.doctorAppointment;

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const appointment = await DoctorAppointment.create(req.body);
    res.json(appointment);
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ error: "Error creating appointment" });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await DoctorAppointment.findAll();
    res.json(appointments);
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
  const { appointment_id } = req.params;
  try {
    const appointment = await DoctorAppointment.findByPk(appointment_id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ error: "Error fetching appointment" });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  try {
    const [updated] = await DoctorAppointment.update(req.body, {
      where: { appointment_id: appointment_id },
    });
    if (updated) {
      const appointment = await DoctorAppointment.findByPk(appointment_id);
      res.json(appointment);
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ error: "Error updating appointment" });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  try {
    const deleted = await DoctorAppointment.destroy({
      where: { appointment_id: appointment_id },
    });
    if (deleted) {
      res.json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ error: "Error deleting appointment" });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
