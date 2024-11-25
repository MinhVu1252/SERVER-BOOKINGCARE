const express = require("express");
const { getDoctors, getDoctorById } = require("../controllers/doctorController");
const router = express.Router();

// Lấy danh sách bác sĩ
//router.get("/", getDoctors);

// Lấy chi tiết bác sĩ theo ID
//router.get("/:id", getDoctorById);

module.exports = router;
