module.exports = (sequelize, DataTypes) => {
  const DoctorAppointment = sequelize.define("DoctorAppointment", {
    appointment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return DoctorAppointment;
};
