const fs = require("fs/promises");

function fsPromises1(path, randomFiles) {
  fs.access(path + "/files")
    .then(() => {
      return createRandomFiles(path + "/files/", randomFiles);
    })
    .then(() => {
      return deleteRandomFiles(path + "/files/", randomFiles);
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        return fs
          .mkdir(path + "/files")
          .then(() => createRandomFiles(path + "/files/", randomFiles))
          .then(() => deleteRandomFiles(path + "/files/", randomFiles))
          .catch((err) => console.log(err));
      } else {
        console.log(err);
      }
    });
}
function createRandomFiles(path, randomFiles) {
  const promises = [];
  for (let i = 1; i <= randomFiles; i++) {
    promises.push(
      fs
        .writeFile(path + `file${i}.json`, "")
        .then(() => {
          console.log(`file${i}.json created`);
        })
        .catch((err) => console.log(err))
    );
  }
  return Promise.all(promises);
}
function deleteRandomFiles(path, randomFiles) {
  const promises = [];
  for (let i = 1; i <= randomFiles; i++) {
    promises.push(
      fs
        .unlink(path + `file${i}.json`)
        .then(() => console.log(`Deleted file${i}.json`))
        .catch((err) => console.log(err))
    );
  }
  return Promise.all(promises);
}

fsPromises1("/home/wasim/Assignment/callback-assignment", 3);
