const fs = require("fs");

function createDirectoryWithFiles(directoryPath, fileCount) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, (err) => {
      if (err) {
        reject(err);
      } else {
        let currentIndex = 1;

        const createNextFile = () => {
          if (currentIndex <= fileCount) {
            const filePath = `${directoryPath}/file${currentIndex}.json`;
            const content = JSON.stringify({ data: Math.random() });

            fs.writeFile(filePath, content, (writeErr) => {
              if (writeErr) {
                reject(writeErr);
              } else {
                console.log(`File '${filePath}' created.`);

                fs.unlink(filePath, (unlinkErr) => {
                  if (unlinkErr) {
                    reject(unlinkErr);
                  } else {
                    console.log(`File '${filePath}' deleted.`);
                    currentIndex++;
                    createNextFile(); // Create the next file recursively
                  }
                });
              }
            });
          } else {
            resolve(
              `Directory '${directoryPath}' created with ${fileCount} random JSON files.`
            );
          }
        };

        createNextFile();
      }
    });
  });
}

const directoryPath = "File";

createDirectoryWithFiles(directoryPath, 5)
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error))
  .finally(() => {
    fs.rmdir(directoryPath, (err) => {
      if (err) {
        console.error("Error removing directory:", err);
      } else {
        console.log(`Directory '${directoryPath}' removed.`);
      }
    });
  });
