const fs = require("fs");
const path = require("path");
const { stdout } = require("process");

fs.readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(
          path.join(__dirname, "secret-folder", file.name),
          (err, stats) => {
            if (err) {
              console.log(err);
            }
            stdout.write(`${file.name.split('.')[0]} - ${path.extname(file.name).split('.')[1]} - ${stats.size}b\n`);
          }
        );
      }
    })
  }
);