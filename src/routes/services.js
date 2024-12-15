const express = require("express");
const serviceRouter = express.Router();
const Service = require("../models/service");
const { verifyAdmin } = require("../middlewares/services");

// Create a service (admin only)
serviceRouter.post("/services", verifyAdmin, async (req, res) => {
  try {
    const { name, status, description } = req.body;
    const service = new Service({ name, status, description });
    const savedService = await service.save();
    res
      .status(201)
      .json({ message: "Service created successfully", data: savedService });
  } catch (err) {
    res.status(400).send("Error creating service: " + err.message);
  }
});

// Update service status (admin only)
serviceRouter.put("/services/:id", verifyAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Service updated successfully", data: service });
  } catch (err) {
    res.status(400).send("Error updating service: " + err.message);
  }
});

// Get all services (public)
serviceRouter.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ message: "Services retrieved successfully", data: services });
  } catch (err) {
    res.status(400).send("Error fetching services: " + err.message);
  }
});

// Get a specific service by ID (public)
// Delete a service (admin only)
serviceRouter.delete("/services/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).send("Service not found");
    }
    res.json({ message: "Service deleted successfully", data: deletedService });
  } catch (err) {
    res.status(400).send("Error deleting service: " + err.message);
  }
});

module.exports = serviceRouter;
