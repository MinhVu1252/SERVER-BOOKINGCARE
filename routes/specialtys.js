const express = require("express");
const { getSpecialties, getSpecialtiesById } = require("../controllers/specialtyController"); // Import controller

const router = express.Router();

// Route để trả về danh sách chuyên khoa từ specialtyController
router.get("/", getSpecialties);

router.get("/:id", getSpecialtiesById); 

module.exports = router;
