const fs = require("fs");
const path = require("path");

const filePathServices = path.join(__dirname, "../data/services.json");

// Lấy danh sách dịch vụ theo hospital_id và type
const getServicesByHospitalAndType = (req, res) => {
  const { hospitalId, type } = req.params; // Lấy tham số từ URL

  console.log("Hospital ID:", hospitalId);
  console.log("Type:", type);

  try {
    // Đọc dữ liệu từ file services.json
    const data = fs.readFileSync(filePathServices, "utf8");
    const services = JSON.parse(data);

    // Lọc các dịch vụ theo hospital_id và type
    const filteredServices = services.filter(service => 
      service.hospital_id == hospitalId && service.type == type
    );

    if (filteredServices.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ nào cho bệnh viện này với loại dịch vụ này." });
    }

    res.json(filteredServices); // Trả về danh sách dịch vụ phù hợp
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đọc dữ liệu dịch vụ", error });
  }
};

module.exports = {
  getServicesByHospitalAndType
};
