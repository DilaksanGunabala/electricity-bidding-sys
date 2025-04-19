const Request = require('../models/requestModel');
const User = require('../models/userModel');
const Battery = require('../models/batteryModel');

// Submit a new power request
exports.submitRequest = async (req, res) => {
  try {
    const { userId, requestedPower, bidAmount } = req.body;

    const request = await Request.create({
      user: userId,
      requestedPower,
      bidAmount,
    });

    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all requests (for admin/analysis)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bidding logic: allocate available battery to top bidders
exports.runBidding = async (req, res) => {
  try {
    const battery = await Battery.findOne();
    if (!battery || battery.availableCapacity <= 0) {
      return res.status(400).json({ message: 'No available battery power!' });
    }

    const availablePower = battery.availableCapacity;

    // Get all pending requests and sort by bidAmount (highest first)
    const requests = await Request.find({ status: 'pending' }).sort({ bidAmount: -1 });

    let totalAllocated = 0;
    let updatedRequests = [];

    for (let req of requests) {
      if (totalAllocated + req.requestedPower <= availablePower) {
        req.status = 'approved';
        totalAllocated += req.requestedPower;
      } else {
        req.status = 'rejected';
      }
      await req.save();
      updatedRequests.push(req);
    }

    // Update available battery capacity
    battery.availableCapacity -= totalAllocated;
    battery.lastUpdated = new Date();
    await battery.save();

    res.status(200).json({
      success: true,
      message: 'Bidding process completed.',
      allocatedPower: totalAllocated,
      remainingPower: battery.availableCapacity,
      results: updatedRequests,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
