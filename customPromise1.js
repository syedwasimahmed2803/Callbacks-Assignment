const fs = require("fs");
function createFiles(path, count) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(err);
      } else {
        const promise = [];
        for (let i = 1; i <= count; i++) {
          const filePath = `${path}/file${i}.json`;
          const content = JSON.stringify({ data: 0 });
          promise.push(writeFile(filePath, content));
        }
        Promise.all(promise)
          .then(() =>
            resolve(`Directory '${path}' created with ${count} JSON files`)
          )
          .catch(reject);
      }
    });
  });
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`${filePath} created`));
      }
    });
  });
}

function deleteFiles(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const deletePromise = data.map((file) => {
          const filePath = `${path}/${file}`;
          return unlink(filePath);
        });
        Promise.all(deletePromise)
          .then(() => resolve(`Deleted ${data.length} files from '${path}'. `))
          .catch(reject);
      }
    });
  });
}
function unlink(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`${filePath} deleted`));
      }
    });
  });
}

const path = "Files";
createFiles(path, 5)
  .then((result) => console.log(result))
  .then(() => deleteFiles(path))
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));
