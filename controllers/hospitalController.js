// controllers/hospitalController.js

const fs = require("fs");
const path = require("path");

const filePathHospitals = path.join(__dirname, "../data/hospital.json");
const filePathHospSpec = path.join(__dirname, "../data/hosp-spec.json");
const filePathSpecialtys = path.join(__dirname, "../data/specialty.json");
// Lấy danh sách tất cả bệnh viện
const getHospitals = (req, res) => {
  try {
    const data = fs.readFileSync(filePathHospitals, "utf8");
    const hospitals = JSON.parse(data);
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đọc dữ liệu bệnh viện", error });
  }
};

// Lấy thông tin bệnh viện theo ID
const getHospitalById = (req, res) => {
  const id = parseInt(req.params.id, 10); // Chuyển id từ chuỗi sang số nguyên

  console.log("ID được truyền vào:", id); // In id ra console để kiểm tra

  try {
    const data = fs.readFileSync(filePathHospitals, "utf8");
    const hospitals = JSON.parse(data);

    const hospital = hospitals.find((h) => h.id === id); // So sánh với số nguyên

    if (!hospital) {
      return res.status(404).json({ message: "Bệnh viện không tồn tại." });
    }
    console.log("ID ", hospital.specialty_ids);
    res.json(hospital.specialty_ids); // Trả về toàn bộ thông tin bệnh viện
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đọc dữ liệu bệnh viện", error });
  }
};

const getSpecialtiesByHospital = (req, res) => {
  const id = parseInt(req.params.hospitalId, 10); // Sử dụng hospitalId thay vì id

  console.log("ID được truyền vào:", id); // In id ra console để kiểm tra

  try {
    // Đọc dữ liệu từ file hosp-spec.json
    const dataHospSpec = fs.readFileSync(filePathHospSpec, "utf8");
    const hospSpecs = JSON.parse(dataHospSpec);

    // Lọc danh sách các bản ghi có hospital_id trùng với id
    const hospitalList = hospSpecs.filter(
      (h) => parseInt(h.hospital_id, 10) === id
    );

    if (hospitalList.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có bản ghi nào cho bệnh viện này." });
    }

    // Lấy danh sách specialty_id từ hospitalList
    const specialtyIds = hospitalList.map((h) => h.specialty_id);

    // Đọc dữ liệu từ file specialty.json
    const dataSpecialties = fs.readFileSync(filePathSpecialtys, "utf8");
    const specialties = JSON.parse(dataSpecialties);

    // Lấy danh sách các đối tượng specialty dựa trên specialty_id
    const matchedSpecialties = specialties.filter((specialty) =>
      specialtyIds.includes(specialty.id)
    );

    if (matchedSpecialties.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy chuyên khoa nào." });
    }

    console.log("Danh sách chuyên khoa:", matchedSpecialties);
    res.json(matchedSpecialties); // Trả về danh sách các đối tượng specialty
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đọc dữ liệu", error });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  getSpecialtiesByHospital,
};
