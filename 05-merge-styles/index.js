const fs = require("fs");
const path = require("path");

const pathBundle = path.join(__dirname, "project-dist", "bundle.css");
const pathStyles = path.join(__dirname, "styles");

mergeStyles(pathBundle, pathStyles);

function mergeStyles(pathBundle, pathStyles) {
  let resStyles = [];

  fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    const sortFiles = files.filter(file => file.isFile() && path.extname(file.name) === ".css");

    sortFiles.forEach(file => {
      fs.readFile(path.join(pathStyles, file.name), "utf-8", (err, data) => {
          if (err) throw err;
          resStyles.push(data);

          if (resStyles.length === sortFiles.length) {
            fs.writeFile(pathBundle, resStyles.join("\n"), (err) => {
              if (err) throw err;
            })
          }
        }
      )
    })

  })
}