const fs = require("fs");
const path = require("path");
const { stdout } = process;

fs.readFile(path.join(__dirname, "text.txt"), (error, data) => {
  if (error) return console.error(error.message);
  stdout.write(data.toString());
})