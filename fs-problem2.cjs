const fs = require("fs");

function fsProblem2() {
  fs.readFile("lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    fs.writeFile("upperCase.txt", data.toUpperCase(), (err) => {
      if (err) {
        console.error(err);
      }
      fs.appendFile("filenames.txt", "upperCase.txt" + "\n", (err) => {
        if (err) {
          console.error(err);
        }
        fs.readFile("upperCase.txt", "utf8", (err, data) => {
          if (err) {
            console.error(err);
          }
          fs.writeFile(
            "sentences.txt",
            data.toLowerCase().split(/[.!?]/).join("\n"),
            (err) => {
              if (err) {
                console.error(err);
              }
              fs.appendFile("filenames.txt", "sentences.txt" + "\n", (err) => {
                if (err) {
                  console.error(err);
                }
                fs.readFile("filenames.txt", "utf8", (err, data) => {
                  if (err) console.err(err);
                  const arrayOfFiles = data.trim().split("\n");
                  const sortedData = arrayOfFiles
                    .map((filename) => {
                      return fs.readFileSync(filename, "utf8");
                    })
                    .sort()
                    .join("\n");
                  fs.writeFile("sorted.txt", sortedData, (err) => {
                    if (err) {
                      console.error(err);
                    }
                    fs.appendFile("filenames.txt", "sorted.txt", (err) => {
                      if (err) {
                        console.error(err);
                      }
                      fs.readFile("filenames.txt", "utf8", (err, data) => {
                        if (err) {
                          console.err(err);
                        }
                        const arrayOfFiles = data.trim().split("\n");
                        arrayOfFiles.forEach((file) => {
                          fs.unlinkSync(file);
                        });
                      });
                    });
                  });
                });
              });
            }
          );
        });
      });
    });
  });
}
fsProblem2();
module.exports = fsProblem2;
