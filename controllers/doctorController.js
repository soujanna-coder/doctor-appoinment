const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const DoctorsDetails = db.doctor;
const createDoctorDetails = async (req, res) => {
  try {
    const doctorDetails = await DoctorsDetails.create(req.body);
    res.json({
      message: "Doctor details created successfully!",
      doctorDetails,
    });
  } catch (err) {
    console.error("Error creating doctor details:", err);
    res.status(500).json({ message: "Failed to create doctor details." });
  }
};
const getAllDoctorDetails = async (req, res) => {
  try {
    const doctorDetails = await DoctorsDetails.findAll();
    res.json({ doctorDetails });
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    res.status(500).json({ message: "Failed to fetch doctor details." });
  }
};

const getDoctorDetailsById = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const doctorDetails = await DoctorsDetails.findByPk(doctor_id);
    if (!doctorDetails) {
      return res.status(404).json({ message: "Doctor details not found." });
    }
    res.json({ doctorDetails });
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    res.status(500).json({ message: "Failed to fetch doctor details." });
  }
};

const updateDoctorDetails = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const doctorDetails = await DoctorsDetails.findByPk(doctor_id);
    if (!doctorDetails) {
      return res.status(404).json({ message: "Doctor details not found." });
    }
    await doctorDetails.update(req.body);
    res.json({
      message: "Doctor details updated successfully!",
      doctorDetails,
    });
  } catch (err) {
    console.error("Error updating doctor details:", err);
    res.status(500).json({ message: "Failed to update doctor details." });
  }
};

const deleteDoctorDetails = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const doctorDetails = await DoctorsDetails.findByPk(doctor_id);
    if (!doctorDetails) {
      return res.status(404).json({ message: "Doctor details not found." });
    }
    await doctorDetails.destroy();
    res.json({ message: "Doctor details deleted successfully!" });
  } catch (err) {
    console.error("Error deleting doctor details:", err);
    res.status(500).json({ message: "Failed to delete doctor details." });
  }
};

module.exports = {
  createDoctorDetails,
  getAllDoctorDetails,
  getDoctorDetailsById,
  updateDoctorDetails,
  deleteDoctorDetails,
};
