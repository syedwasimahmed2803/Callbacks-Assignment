const fs = require("fs");
const dir = "/home/wasim/Assignment/callback-assignment/";

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dir}${fileName}`, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}${fileName}`, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Write");
      }
    });
  });
}

function appendFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(`${dir}${fileName}`, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Append");
      }
    });
  });
}
function unlink(fileName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${dir}${fileName}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Delete");
      }
    });
  });
}

function customPromise2() {
  readFile("lipsum.txt")
    .then((data) => writeFile("upperCase.txt", data.toUpperCase()))
    .then(() => writeFile("fileName.txt", "upperCase.txt\n"))
    .then(() => readFile("upperCase.txt"))
    .then((data) =>
      writeFile("sentences.txt", data.toLowerCase().split(/[.!?]/).join("\n"))
    )
    .then(() => appendFile("fileName.txt", "sentences.txt\n"))
    .then(() => readFile("fileName.txt"))
    .then((data) => {
      const arrayOfFiles = data.trim().split("\n");
      return Promise.all(
        arrayOfFiles.map((fileName) => readFile("/" + fileName, "utf-8"))
      );
    })
    .then((data) => {
      const sortedContents = data.sort().join("\n");
      return writeFile("sorted.txt", sortedContents);
    })
    .then(() => appendFile("fileName.txt", "sorted.txt\n"))
    .then(() => readFile("fileName.txt"))
    .then((data) => {
      let filesToDelete = data.split("\n").filter(Boolean);
      filesToDelete.forEach((file) => {
        unlink(file);
      });
    })
    .catch((err) => console.log(err));
}
customPromise2();
