// Define the Appointment model
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    appointment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    appointment_venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    workshop_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    workshop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    booking_from: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    booking_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    doctor_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    document_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    last_edu: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    whatsapp_no: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    appointment_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
  return Appointment;
};
