const fs = require("fs");
const path = require("path");

const pathFiles = path.join(__dirname, "files");
const pathFilesCopy = path.join(__dirname, "files-copy");

function copyDir() {

  fs.mkdir(pathFilesCopy, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("Folder was created");
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

copyDir();