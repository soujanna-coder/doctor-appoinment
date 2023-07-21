module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    doctor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    details2: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    details3: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    appointment_fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    appointment_venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  return Doctor;

  // Define the association between Doctor and DoctorAppointment models

  Doctor.hasMany(sequelize.models.DoctorAppointment, {
    foreignKey: "doctor_id",
  });
  sequelize.models.DoctorAppointment.belongsTo(Doctor, {
    foreignKey: "doctor_id",
  });
};
