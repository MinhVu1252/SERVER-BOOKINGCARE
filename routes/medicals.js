const express = require("express");
const router = express.Router();

const {
  getMedicals,
  getMedicalById,
} = require("../controllers/medicalController");

// Lấy danh sách gói khám bệnh
router.get("/", getMedicals);

// Lấy thông tin gói khám bệnh theo ID
router.get("/:id", getMedicalById);

module.exports = router;
