const mongoose = require("mongoose");

// Service schema definition
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Operational",
        "Degraded Performance",
        "Partial Outage",
        "Major Outage",
      ],
      default: "Operational",
    },
    description: {
      type: String,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
