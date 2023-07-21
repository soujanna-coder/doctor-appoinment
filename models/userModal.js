// Define the User and OTPVerification models
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  });
  // Set up associations between User and OTPVerification models
  // Define associations
  User.hasMany(sequelize.models.OTPVerification, { foreignKey: "user_id" });
  sequelize.models.OTPVerification.belongsTo(User, { foreignKey: "user_id" });
  return User;
};
