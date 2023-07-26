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
        "mobile_number",
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
    const notification_details = {
      instance_id: "64C0EE7B55914",
      access_token: "64bffee720a77",
      login_email: "soumyajitdas500@gmail.com",
      login_password: "Console@1234",
      login_link: "https://hisocial.in/login",
    };
    // Create the final response
    const response = {
      status: "200",
      message: "Successful",
      workshop_data: workshops,
      doctor_data: transformedDoctors,
      notification_details: notification_details,
    };

    res.json(response);
  } catch (err) {
    console.log(err);
    const response = {
      status: "500",
      message: "Error fetching data",
    };
    res.json(response);
  }
};
module.exports = {
  doctorList,
};
