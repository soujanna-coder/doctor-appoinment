// const dbConfig = require("../config/dbConfig-prod");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.otpVerification = require("./otpVerificationModel.js")(sequelize, DataTypes);
db.user = require("./userModal.js")(sequelize, DataTypes);
db.workshop = require("./workshopModal.js")(sequelize, DataTypes);

db.doctorAppointment = require("./doctorAppointmentModal.js")(
  sequelize,
  DataTypes
);

db.doctorType = require("./doctorTypeModal.js")(sequelize, DataTypes);
db.appointment = require("./appointmentModal.js")(sequelize, DataTypes);
db.doctor = require("./doctorModal.js")(sequelize, DataTypes);
db.Payment = require("./PaymentModal.js")(sequelize, DataTypes);
db.status = require("./statusModal.js")(sequelize, DataTypes);
db.bookingType = require("./bookingTypeModal.js")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
