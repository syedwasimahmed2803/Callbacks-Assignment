const fs = require("fs");
const path = require("path");

function fsProblem2() {
  fs.readFile(path.join(__dirname) + "lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    fs.writeFile(
      path.join(__dirname) + path.join(__dirname) + "upperCase.txt",
      data.toUpperCase(),
      (err) => {
        if (err) {
          console.error(err);
        }
        fs.appendFile(
          path.join(__dirname) + "filenames.txt",
          "upperCase.txt" + "\n",
          (err) => {
            if (err) {
              console.error(err);
            }
            fs.readFile(
              path.join(__dirname) + "upperCase.txt",
              "utf8",
              (err, data) => {
                if (err) {
                  console.error(err);
                }
                fs.writeFile(
                  path.join(__dirname) + "sentences.txt",
                  data.toLowerCase().split(/[.!?]/).join("\n"),
                  (err) => {
                    if (err) {
                      console.error(err);
                    }
                    fs.appendFile(
                      path.join(__dirname) + "filenames.txt",
                      "sentences.txt" + "\n",
                      (err) => {
                        if (err) {
                          console.error(err);
                        }
                        fs.readFile(
                          path.join(__dirname) + "filenames.txt",
                          "utf8",
                          (err, data) => {
                            if (err) console.err(err);
                            const arrayOfFiles = data.trim().split("\n");
                            const sortedData = arrayOfFiles
                              .map((filename) => {
                                return fs.readFileSync(filename, "utf8");
                              })
                              .sort()
                              .join("\n");
                            fs.writeFile(
                              path.join(__dirname) + "sorted.txt",
                              sortedData,
                              (err) => {
                                if (err) {
                                  console.error(err);
                                }
                                fs.appendFile(
                                  path.join(__dirname) + "filenames.txt",
                                  "sorted.txt",
                                  (err) => {
                                    if (err) {
                                      console.error(err);
                                    }
                                    fs.readFile(
                                      path.join(__dirname) + "filenames.txt",
                                      "utf8",
                                      (err, data) => {
                                        if (err) {
                                          console.err(err);
                                        }
                                        const arrayOfFiles = data
                                          .trim()
                                          .split("\n");
                                        arrayOfFiles.forEach((file) => {
                                          fs.unlinkSync(file);
                                        });
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}
fsProblem2();
module.exports = fsProblem2;
