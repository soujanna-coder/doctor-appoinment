const db = require("../models");

const { Sequelize, DataTypes, Op } = require("sequelize");

const Workshop = db.workshop;

// Create a new workshop
const createWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.create(req.body);
    res.json({ message: "Workshop created successfully!", workshop });
  } catch (err) {
    console.error("Error creating workshop:", err);
    res.status(500).json({ message: "Failed to create workshop." });
  }
};

// Read all workshops
const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll();
    res.json({ workshops });
  } catch (err) {
    console.error("Error fetching workshops:", err);
    res.status(500).json({ message: "Failed to fetch workshops." });
  }
};

// Read a workshop by workshop_id
const getWorkshopById = async (req, res) => {
  try {
    const { workshop_id } = req.params;
    const workshop = await Workshop.findByPk(workshop_id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found." });
    }
    res.json({ workshop });
  } catch (err) {
    console.error("Error fetching workshop:", err);
    res.status(500).json({ message: "Failed to fetch workshop." });
  }
};

// Update a workshop by workshop_id
const updateWorkshop = async (req, res) => {
  try {
    const { workshop_id } = req.params;
    const workshop = await Workshop.findByPk(workshop_id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found." });
    }
    await workshop.update(req.body);
    res.json({ message: "Workshop updated successfully!", workshop });
  } catch (err) {
    console.error("Error updating workshop:", err);
    res.status(500).json({ message: "Failed to update workshop." });
  }
};

// Delete a workshop by workshop_id
const deleteWorkshop = async (req, res) => {
  try {
    const { workshop_id } = req.params;
    const workshop = await Workshop.findByPk(workshop_id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found." });
    }
    await workshop.destroy();
    res.json({ message: "Workshop deleted successfully!" });
  } catch (err) {
    console.error("Error deleting workshop:", err);
    res.status(500).json({ message: "Failed to delete workshop." });
  }
};
module.exports = {
  deleteWorkshop,
  updateWorkshop,
  getAllWorkshops,
  getWorkshopById,
  createWorkshop,
};
