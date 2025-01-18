/* In the index.js file in the 02-write-file directory,
develop a script that outputs a greeting to the console,
waits for text input, and writes the entered text to a file. */

const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;

fs.writeFile(
  path.join(__dirname, "text.txt"),
  '',
  (err) => {
    if (err) throw err;
  }
)

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