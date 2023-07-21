module.exports = (sequelize, DataTypes) => {
  const RazorpayPayment = sequelize.define("Payment", {
    payment_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    settlement_date: {
      type: DataTypes.DATEONLY,
    },
    refunded_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    refund_status: {
      type: DataTypes.STRING(20),
    },
    captured_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    invoice_id: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(255),
    },
    payment_details: {
      type: DataTypes.TEXT, // Or use DataTypes.TEXT if JSON is not supported
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return RazorpayPayment;
};
