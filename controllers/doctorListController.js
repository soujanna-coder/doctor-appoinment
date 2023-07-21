const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const DoctorAppointment = db.doctorAppointment;
const DoctorType = db.doctorType;
const Doctor = db.doctor;
const Workshop = db.workshop;

// Fetch all workshops and doctors data
const doctorList = async (req, res) => {
  try {
    // Fetch all workshops
    const workshops = await Workshop.findAll({
      attributes: [
        "workshop_name",
        "workshop_date",
        "workshop_time",
        "workshop_duration",
        "workshop_venue",
        "workshop_id",
        "workshop_fees",
      ],
    });

    // Fetch all doctors with their appointments and type information
    const doctors = await Doctor.findAll({
      attributes: [
        "name",
        "doctor_id",
        "type_name",
        "type_id",
        "details1",
        "details2",
        "details3",
        "appointment_time",
        "appointment_fees",
        "appointment_venue",
      ],
      include: [
        {
          model: DoctorAppointment,
          attributes: ["appointment_date"],
        },
        {
          model: DoctorType,
          attributes: [],
        },
      ],
    });

    // Transform the doctor data to include available_date array
    const transformedDoctors = doctors.map((doctor) => {
      const available_date = doctor.DoctorAppointments.map((appointment) => ({
        appointment_date: appointment.appointment_date,
      }));

      return {
        ...doctor.toJSON(),
        available_date,
      };
    });

    // Create the final response
    const response = {
      status: "200",
      message: "Successful",
      workshop_data: workshops,
      doctor_data: transformedDoctors,
    };

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching data" });
  }
};
module.exports = {
  doctorList,
};
