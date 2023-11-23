const fs = require("fs");

function fsProblem1(path, randomFiles) {
  fs.access(path + "/files", (err) => {
    if (err) {
      fs.mkdir(path + "/files", (err) => {
        if (err) {
          console.log(err);
        } else {
          createRandomFiles(path + "/files/", randomFiles);
        }
      });
    } else {
      createRandomFiles(path + "/files/", randomFiles);
    }
  });
}

function createRandomFiles(path, randomFiles) {
  for (let i = 1; i <= randomFiles; i++) {
    fs.writeFile(path + `file${i}.json`, "", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`file created file${i}.json`);
        deleteRandomFiles(path + `file${i}.json`, i);
      }
    });
  }
}

function deleteRandomFiles(path, file) {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Deleted file${file}.json`);
    }
  });
}

module.exports = fsProblem1;
