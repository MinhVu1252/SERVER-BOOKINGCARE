const express = require("express");
const { getServicesByHospitalAndType } = require("../controllers/serviceController");

const router = express.Router();

// Route để lấy dịch vụ theo hospital_id và type
router.get("/:hospitalId/:type", getServicesByHospitalAndType);

module.exports = router;
