// Define the Workshop model
module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define("Workshop", {
    workshop_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workshop_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    workshop_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    workshop_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    workshop_duration: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    workshop_venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    workshop_fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
  return Workshop;
};
