const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  totalCapacity: {
    type: Number,
    required: true,
  },
  availableCapacity: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Battery', batterySchema);
