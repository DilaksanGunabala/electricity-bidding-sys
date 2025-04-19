const express = require('express');
const router = express.Router();
const {
  submitRequest,
  getAllRequests,
  runBidding,
} = require('../controllers/requestController');

router.post('/submit', submitRequest);
router.get('/', getAllRequests);
router.post('/run-bidding', runBidding);

module.exports = router;
