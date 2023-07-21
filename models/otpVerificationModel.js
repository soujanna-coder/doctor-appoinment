module.exports = (sequelize, DataTypes) => {
  const OTPVerification = sequelize.define("OTPVerification", {
    otp_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    otp_created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    otp_expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return OTPVerification;
};
