// Define the Status model
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define("Status", {
    status_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Status;
};
