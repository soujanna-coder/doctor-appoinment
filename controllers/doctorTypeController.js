const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const DoctorType = db.doctorType;

const doctorTypeEnter = async (req, res) => {
  try {
    const { doctor_type_name } = req.body;
    console.log("doctor_type_name" + doctor_type_name);
    const doctorType = await DoctorType.create({
      doctor_type_name,
    });
    res.json({
      message: "Doctor type created successfully!",
      data: doctorType,
    });
  } catch (err) {
    console.error("Error creating Doctor type:", err);
    res.status(500).json({ message: "Failed to create Doctor type." });
  }
};

const allDoctorType = async (req, res) => {
  try {
    const doctorType = await DoctorType.findAll();

    res.json({ message: "DoctorType fetch successfully!", data: doctorType });
  } catch (err) {
    console.error("Error fetching DoctorType:", err);
    res.status(500).json({ message: "Failed to fetch DoctorType." });
  }
};

const allDoctorTypeUpdate = async (req, res) => {
  try {
    const { type_id } = req.params;
    const { doctor_type_name } = req.body;

    const doctorType = await DoctorType.findByPk(type_id);

    if (!doctorType) {
      return res.status(404).json({ message: "doctorType not found." });
    }

    await doctorType.update({ doctor_type_name });

    res.json({
      message: "doctorType updated successfully!",
      data: doctor_type_name,
    });
  } catch (err) {
    console.error("Error updating doctorType:", err);
    res.status(500).json({ message: "Failed to update doctorType." });
  }
};

const doctorTypeDelete = async (req, res) => {
  try {
    const { type_id } = req.params;

    const doctorType = await DoctorType.findByPk(type_id);

    if (!doctorType) {
      return res.status(404).json({ message: "doctorType not found." });
    }

    await doctorType.destroy();

    res.json({ message: "doctorType deleted successfully!" });
  } catch (err) {
    console.error("Error deleting doctorType:", err);
    res.status(500).json({ message: "Failed to delete doctorType." });
  }
};
module.exports = {
  doctorTypeEnter,
  allDoctorType,
  allDoctorTypeUpdate,
  doctorTypeDelete,
};
