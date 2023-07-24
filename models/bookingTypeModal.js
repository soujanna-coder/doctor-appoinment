module.exports = (sequelize, DataTypes) => {
  const BookingType = sequelize.define("BookingType", {
    booking_type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    booking_type: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return BookingType;
};
