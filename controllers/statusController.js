const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const Status = db.status;

const newStatusEnter = async (req, res) => {
  try {
    const { status_name, status_code } = req.body;

    const status = await Status.create({ status_name, status_code });
    res.json({ message: "Status created successfully!", data: status });
  } catch (err) {
    console.error("Error creating status:", err);
    res.status(500).json({ message: "Failed to create status." });
  }
};

const allStatus = async (req, res) => {
  try {
    const statuses = await Status.findAll();

    res.json({ message: "Status fetch successfully!", data: statuses });
  } catch (err) {
    console.error("Error fetching statuses:", err);
    res.status(500).json({ message: "Failed to fetch statuses." });
  }
};

const statusUpdate = async (req, res) => {
  try {
    const { status_id } = req.params;
    const { status_name } = req.body;

    const status = await Status.findByPk(status_id);

    if (!status) {
      return res.status(404).json({ message: "Status not found." });
    }

    await status.update({ status_name });

    res.json({ message: "Status updated successfully!", status });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status." });
  }
};

const statusDelete = async (req, res) => {
  try {
    const { status_id } = req.params;

    const status = await Status.findByPk(status_id);

    if (!status) {
      return res.status(404).json({ message: "Status not found." });
    }

    await status.destroy();

    res.json({ message: "Status deleted successfully!" });
  } catch (err) {
    console.error("Error deleting status:", err);
    res.status(500).json({ message: "Failed to delete status." });
  }
};
module.exports = {
  newStatusEnter,
  allStatus,
  statusUpdate,
  statusDelete,
};
