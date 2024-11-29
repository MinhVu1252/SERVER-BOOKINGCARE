const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");

// Định nghĩa route để tạo booking
router.post("/", createBooking);

module.exports = router;
