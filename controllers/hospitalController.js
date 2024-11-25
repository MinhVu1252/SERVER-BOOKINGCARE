const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/hospital.json");

// Lấy danh sách bệnh viện
const getHospitals = (req, res) => {
  const data = fs.readFileSync(filePath);
  const hospitals = JSON.parse(data);
  res.json(hospitals);
};

// Lấy thông tin bệnh viện theo ID
const getHospitalById = (req, res) => {
  const data = fs.readFileSync(filePath);
  const hospitals = JSON.parse(data);
  const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
  if (hospital) {
    res.json(hospital);
  } else {
    res.status(404).json({ error: "Bệnh viện không tồn tại." });
  }
};

// Thêm bệnh viện mới
const addHospital = (req, res) => {
  const data = fs.readFileSync(filePath);
  const hospitals = JSON.parse(data);
  const newHospital = { id: hospitals.length + 1, ...req.body };
  hospitals.push(newHospital);

  fs.writeFileSync(filePath, JSON.stringify(hospitals, null, 2));
  res.status(201).json(newHospital);
};

// Cập nhật thông tin bệnh viện
const updateHospital = (req, res) => {
  const data = fs.readFileSync(filePath);
  const hospitals = JSON.parse(data);
  const index = hospitals.findIndex(h => h.id === parseInt(req.params.id));

  if (index !== -1) {
    hospitals[index] = { ...hospitals[index], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(hospitals, null, 2));
    res.json(hospitals[index]);
  } else {
    res.status(404).json({ error: "Bệnh viện không tồn tại." });
  }
};

// Xóa bệnh viện
const deleteHospital = (req, res) => {
  const data = fs.readFileSync(filePath);
  const hospitals = JSON.parse(data);
  const updatedHospitals = hospitals.filter(h => h.id !== parseInt(req.params.id));

  if (updatedHospitals.length !== hospitals.length) {
    fs.writeFileSync(filePath, JSON.stringify(updatedHospitals, null, 2));
    res.json({ message: "Xóa thành công." });
  } else {
    res.status(404).json({ error: "Bệnh viện không tồn tại." });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  addHospital,
  updateHospital,
  deleteHospital,
};
