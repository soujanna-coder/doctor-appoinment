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
    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  });
  // Define the association with DoctorType model
  Doctor.belongsTo(sequelize.models.DoctorType, {
    foreignKey: "type_id",
  });

  // Define the association with DoctorAppointment model
  Doctor.hasMany(sequelize.models.DoctorAppointment, {
    foreignKey: "doctor_id",
  });
  sequelize.models.DoctorType.hasMany(sequelize.models.Doctor, {
    foreignKey: "type_id",
  });
  sequelize.models.DoctorAppointment.belongsTo(sequelize.models.Doctor, {
    foreignKey: "doctor_id",
  });
  return Doctor;
};
