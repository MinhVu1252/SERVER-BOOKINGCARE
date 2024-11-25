const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path"); // Import path module

const hospitalRoutes = require("./routes/hospitals");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware để phục vụ ảnh tĩnh từ thư mục 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use("/api/hospitals", hospitalRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
