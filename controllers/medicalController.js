const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/medical.json");

// Lấy danh sách gói khám bệnh
const getMedicals = (req, res) => {
  const data = fs.readFileSync(filePath);
  const medicals = JSON.parse(data);
  res.json(medicals);
};

// Lấy thông tin gói khám bệnh theo ID
const getMedicalById = (req, res) => {
  const data = fs.readFileSync(filePath);
  const medicals = JSON.parse(data);
  const medical = medicals.find((h) => h.id === parseInt(req.params.id));
  if (medical) {
    res.json(medical);
  } else {
    res.status(404).json({ error: "Gói khám bệnh không tồn tại." });
  }
};

module.exports = {
  getMedicals,
  getMedicalById,
};
