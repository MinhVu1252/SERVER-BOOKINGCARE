const fs = require("fs");

const readJSON = (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
