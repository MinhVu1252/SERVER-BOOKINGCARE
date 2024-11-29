const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const hospitalRoutes = require("./routes/hospitals");
const medicalRoutes = require("./routes/medicals");
const specialtyRoutes = require("./routes/specialtys");
const servicesRoutes = require("./routes/services");
const bookingRoutes = require("./routes/booking"); // Thêm route booking

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware để phục vụ ảnh tĩnh từ thư mục 'images'
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/specialtys", specialtyRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingRoutes); // Sử dụng route booking
app.use("/api/medicals", medicalRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
