const fs = require("fs");

function fsProblem1(path, randomFiles) {
  fs.access(path + "/files", (err) => {
    if (err) {
      fs.mkdir(path + "/files", (err) => {
        if (err) {
          console.error(err);
        } else {
          createRandomFiles(path + "/files/", randomFiles, () => {
            deleteRandomFiles(path + "/files/", randomFiles);
          });
        }
      });
    } else {
      createRandomFiles(path + "/files/", randomFiles, () => {
        deleteRandomFiles(path + "/files/", randomFiles);
      });
    }
  });
}

function createRandomFiles(path, randomFiles, callback) {
  let count = randomFiles;
  function createFile(i) {
    fs.writeFile(path + `file${i}.json`, "", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File created: file${i}.json`);
      }
      count--;
      if (count === 0) {
        callback();
      }
    });
  }
  for (let i = 1; i <= randomFiles; i++) {
    createFile(i);
  }
}

function deleteRandomFiles(path, randomFiles) {
  let count = randomFiles;
  function deleteFile(i) {
    fs.unlink(path + `file${i}.json`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File deleted: file${i}.json`);
      }
      count--;
      if (count === 0) {
      }
    });
  }
  for (let i = 1; i <= randomFiles; i++) {
    deleteFile(i);
  }
}

module.exports = fsProblem1;
