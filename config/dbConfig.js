module.exports = {
  HOST: "database-1.cvhs3fo7mzdn.ap-south-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "password",
  DB: "doctor_book",
  dialect: "mysql",
  PORT: "3306",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
