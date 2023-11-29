const fs = require("fs/promises");

function fsPromises1(path, randomFiles) {
  fs.access(path + "/files")
    .then(() => {
      return createRandomFiles(path + "/files/", randomFiles);
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        return fs
          .mkdir(path + "/files")
          .then(() => createRandomFiles(path + "/files/", randomFiles))
          .catch((err) => console.log(err));
      } else {
        console.log(err);
      }
    });
}
function createRandomFiles(path, randomFiles) {
  for (let i = 1; i <= randomFiles; i++) {
    fs.writeFile(path + `file${i}.json`, "")
      .catch((err) => console.log(err))
      .then(() => {
        console.log(`file${i}.json created`);
        deleteRandomFiles(path + `file${i}.json`, i);
      });
  }
}
function deleteRandomFiles(path, file) {
  fs.unlink(path)
    .then(() => console.log(`Deleted file${file}.json`))
    .catch((err) => console.log(err));
}
fsPromises1("/home/wasim/Assignment/callback-assignment", 3);
