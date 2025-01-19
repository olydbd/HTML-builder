const fs = require("fs");
const path = require("path");

const pathProject = path.join(__dirname, "project-dist");
const pathProjectIndex = path.join(pathProject, "index.html");
const pathProjectStyle = path.join(pathProject, "style.css");
const pathProjectAssets = path.join(pathProject, "assets");

const pathTemplate = path.join(__dirname, "template.html");
const pathStyles = path.join(__dirname, "styles");
const pathComponents = path.join(__dirname, "components");
const pathAssets = path.join(__dirname, "assets");

const readStream = fs.createReadStream(pathTemplate, "utf-8");
readStream.on("data", chunk => {
  let chunkStr = chunk;

  let res = "";
  let isFinish = 0;

  fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    const sortHtmlFiles = files.filter(file => file.isFile() && path.extname(file.name) === ".html");
    sortHtmlFiles.forEach(file => {

      fs.readFile(path.join(pathComponents, file.name), "utf-8", (err, data) => {
        if (err) throw err;
        
        res = chunkStr.replace(new RegExp(`{{${file.name.split(".")[0]}}}`, 'g'), data);
        chunkStr = res;

        isFinish++;

        if (sortHtmlFiles.length === isFinish) {
          fs.mkdir(pathProject, { recursive: true }, (err) => {
            if (err) throw err;
            fs.writeFile(pathProjectIndex, res, (err) => {
              if (err) throw err;

              mergeStyles(pathProjectStyle, pathStyles);

              fs.mkdir(pathProjectAssets, { recursive: true }, (err) => {
                fs.readdir(pathAssets, (err, files) => {
                  if (err) throw err;

                  files.forEach(file => {
                    copyDir(path.join(pathAssets, file), path.join(pathProjectAssets, file));
                  })
                })
              })

              console.log("project-dist created");
            })
          })
        }

      })

    })

  })
})

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

function copyDir(pathFiles, pathFilesCopy) {
  fs.mkdir(pathFilesCopy, { recursive: true }, (err) => {
    if (err) throw err;
  })
  fs.readdir((pathFiles), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(path.join(pathFiles, file), path.join(pathFilesCopy, file), (err) => {
        if (err) throw err;
      })
    })
    fs.readdir((pathFilesCopy), (err, filesCopy) => {
      if (err) throw err;
      let deletedFiles = filesCopy.filter(item => !files.includes(item));
      deletedFiles.forEach(item => {
        fs.unlink(path.join(pathFilesCopy, item), err => {
          if (err) throw err;
        })
      })
    })
  })
}