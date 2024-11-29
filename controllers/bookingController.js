const fs = require("fs");
const path = require("path");

const bookingFilePath = path.join(__dirname, "../data/booking.json");

const createBooking = (req, res) => {
  const { fullName, gender, phoneNumber, email, appointment_date, appointment_time, hospitalId, specialty, servicesId } = req.body;

  // Kiểm tra nếu tất cả các trường đã có dữ liệu
  if (!fullName || !phoneNumber || !email || !appointment_date || !appointment_time || !hospitalId || !specialty || !servicesId) {
    return res.status(400).send({ message: "Vui lòng điền đầy đủ thông tin!" });
  }

  // Dữ liệu cần lưu vào booking.json
  const newBooking = {
    fullName,
    gender,
    phoneNumber,
    email,
    appointment_date,
    appointment_time,
    hospitalId,
    specialty,
    servicesId,
    status: "Đặt lịch thành công",
  };

  // Đọc dữ liệu hiện có từ booking.json
  fs.readFile(bookingFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi khi đọc file:", err);
      return res.status(500).send({ message: "Lỗi server, vui lòng thử lại sau!" });
    }

    let bookings = [];
    try {
      bookings = JSON.parse(data); // Chuyển dữ liệu từ JSON sang object
    } catch (parseErr) {
      console.error("Lỗi khi parse dữ liệu:", parseErr);
    }

    // Thêm booking mới vào danh sách
    bookings.push(newBooking);

    // Lưu lại danh sách booking vào file
    fs.writeFile(bookingFilePath, JSON.stringify(bookings, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Lỗi khi ghi file:", writeErr);
        return res.status(500).send({ message: "Lỗi server, vui lòng thử lại sau!" });
      }

      // Trả về thông báo thành công
      res.status(200).send({ message: "Đặt lịch thành công", bookingData: newBooking });
    });
  });
};

module.exports = { createBooking };
