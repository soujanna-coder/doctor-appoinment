"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add data to the 'status' table using the 'queryInterface.bulkInsert' method
    return queryInterface.bulkInsert("status", [
      {
        status_name: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_name: "Approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_name: "On-Hold",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the data from the 'status' table using the 'queryInterface.bulkDelete' method
    return queryInterface.bulkDelete("status", null, {});
  },
};
