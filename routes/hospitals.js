// routes/hospitals.js

const express = require("express");
const {
  getHospitals,
  getHospitalById,
  getSpecialtiesByHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

// Lấy danh sách tất cả bệnh viện
router.get("/", getHospitals);

// Lấy thông tin bệnh viện theo ID
router.get("/:id", getHospitalById); // Lấy thông tin đầy đủ bệnh viện theo ID

// Route để lấy danh sách chuyên khoa theo id bệnh viện
router.get("/:hospitalId/specialties", getSpecialtiesByHospital);

module.exports = router;
