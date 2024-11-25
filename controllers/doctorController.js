const fs = require("fs");

// Lấy danh sách bác sĩ
const getDoctors = (req, res) => {
  const data = fs.readFileSync("./data/doctors.json");
  const doctors = JSON.parse(data);
  res.json(doctors);
};

// Lấy thông tin bác sĩ theo ID
const getDoctorById = (req, res) => {
  const data = fs.readFileSync("./data/doctors.json");
  const doctors = JSON.parse(data);
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: "Bác sĩ không tồn tại." });
  }
};

module.exports = { getDoctors, getDoctorById };
