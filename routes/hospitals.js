const express = require("express");
const {
  getHospitals,
  getHospitalById,
  addHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

// Lấy danh sách bệnh viện
router.get("/", getHospitals);

// Lấy thông tin bệnh viện theo ID
router.get("/:id", getHospitalById);

// Thêm bệnh viện mới
router.post("/", addHospital);

// Cập nhật thông tin bệnh viện
router.put("/:id", updateHospital);

// Xóa bệnh viện
router.delete("/:id", deleteHospital);

module.exports = router;
