const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/specialty.json");

// Lấy danh sách bệnh viện
const getSpecialties = (req, res) => {
  const data = fs.readFileSync(filePath);
  const specialtys = JSON.parse(data);
  res.json(specialtys);
};





const getSpecialtiesById = (req, res) => {
  const id = parseInt(req.params.id, 10); // Chuyển id từ chuỗi sang số nguyên

  console.log("ID được truyền vào:", id); // In id ra console để kiểm tra

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const hospitals = JSON.parse(data);

    const hospital = hospitals.find(h => h.id === id); // So sánh với số nguyên

    if (!hospital) {
      return res.status(404).json({ message: "Bệnh viện không tồn tại." });
    }
    console.log("ID ", hospital.specialty_ids)
    res.json(hospital); // Trả về toàn bộ thông tin bệnh viện
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đọc dữ liệu bệnh viện", error });
  }
};



module.exports = { getSpecialties, getSpecialtiesById};
