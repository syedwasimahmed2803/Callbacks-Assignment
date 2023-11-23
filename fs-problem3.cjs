const fs = require("fs");

function fsProblem1(path, nomberOfFiles, callback) {
  fs.access(path + "./files", (err) => {
    if (err) {
      return callback(err);
    } else {
      createFiles(path + "./files", nomberOfFiles, callback);
    }
  });
}

function createFiles(path, nomberOfFiles, callback) {
  for (let index = 1; index <= nomberOfFiles; index++) {
    fs.writeFile(path + `file${i}.json`, "", (err) => {
      if (err) callback(err);
      else {
        console.log(`File created: file${i}.json`);
        deleteFiles(path + `file${index}.json`, index, callback);
      }
    });
  }
}

function deleteFiles(path, nomberOfFiles, callback) {
  fs.unlink((path, err) => {
    if (err) return callback(err);
    else {
      console.log(`Files deleted: file${index}.json`);
    }
  });
}
