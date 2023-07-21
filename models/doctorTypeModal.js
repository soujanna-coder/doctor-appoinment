module.exports = (sequelize, DataTypes) => {
  const DoctorType = sequelize.define("DoctorType", {
    doctor_type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  sequelize.models.Doctor.belongsTo(DoctorType, {
    foreignKey: "type_id",
  });
  DoctorType.hasMany(sequelize.models.Doctor, { foreignKey: "type_id" });
  return DoctorType;
};
