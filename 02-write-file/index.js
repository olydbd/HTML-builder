const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write("Hello! Enter any text:\n");

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    stdout.write("Goodbye :(");
    exit();
  }
  fs.appendFile(
    path.join(__dirname, "text.txt"),
    data,
    (err) => {
      if (err) throw err;
    }
  )
  process.on("SIGINT", () => {
    stdout.write("Goodbye :(");
    exit();
  })
})