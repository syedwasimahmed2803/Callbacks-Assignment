const fs = require("fs/promises");

function fsPromises2(path, randomFiles) {
  fs.readFile(path + "/lipsum.txt", "utf-8")
    .then((data) => {
      return fs.writeFile(path + "/upperCase.txt", data.toUpperCase());
    })
    .then(() => {
      return fs.appendFile(path + "/fileNames.txt", "upperCase.txt\n");
    })
    .then(() => {
      return fs.readFile(path + "/upperCase.txt", "utf-8");
    })
    .then((data) => {
      return fs.writeFile(
        path + "/sentences.txt",
        data.toLowerCase().split(/[.!?]/).join("\n")
      );
    })
    .then(() => {
      return fs.appendFile(path + "/fileNames.txt", "sentences.txt\n");
    })
    .then(() => {
      return fs.readFile(path + "/fileNames.txt", "utf-8");
    })
    .then((data) => {
      const arrayOfFiles = data.trim().split("\n");
      return Promise.all(
        arrayOfFiles.map((fileName) =>
          fs.readFile(path + "/" + fileName, "utf-8")
        )
      );
    })
    .then((fileContentsArray) => {
      const sortedContents = fileContentsArray.sort().join("\n");
      return fs.writeFile(path + "/sorted.txt", sortedContents);
    })
    .then(() => {
      return fs.appendFile(path + "/fileNames.txt", "sorted.txt\n");
    })
    .then(() => {
      return fs.readFile(path + "/fileNames.txt", "utf-8");
    })
    .then((data) => {
      const arrayOfFiles = data.trim().split("\n");
      return arrayOfFiles.forEach((file) => {
        fs.unlink(file);
      });
    })
    .catch((err) => console.log(err));
}
fsPromises2("/home/wasim/Assignment/callback-assignment", 3);
