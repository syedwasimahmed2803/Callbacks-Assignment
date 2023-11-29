// const fs = require("fs");

// function fsProblem1(path, randomFiles) {
//   fs.access(path + "/files", (err) => {
//     if (err) {
//       fs.mkdir(path + "/files", (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           createFiles(path + "/files/", randomFiles);
//         }
//       });
//     } else {
//       createFiles(path + "/files/", randomFiles);
//     }
//   });
// }
// function createFiles(path, randomFiles) {
//   for (let i = 1; i <= randomFiles; i++) {
//     fs.writeFile(path + `file${i}.json`, "", (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`file${i}.json created`);
//         deleteFiles(path + `file${i}.json`, i);
//       }
//     });
//   }
// }

// function deleteFiles(path, file) {
//   fs.unlink(path, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`file${file}.json deleted`);
//     }
//   });
// }
// // fsProblem1("/home/wasim/Assignment/callback-assignment/", 3);

// function problem2() {
//   fs.readFile(
//     "/home/wasim/Assignment/callback-assignment/lipsum.txt",
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         console.error(err);
//       }
//       fs.writeFile(
//         "/home/wasim/Assignment/callback-assignment/upperCase.txt",
//         data.toUpperCase(),
//         (err, data) => {
//           if (err) {
//             console.log(err);
//           }
//           fs.appendFile(
//             "/home/wasim/Assignment/callback-assignment/fileNames.txt",
//             "upperCase.txt" + "\n",
//             (err, data) => {
//               if (err) {
//                 console.error(err);
//               }
//               fs.readFile(
//                 "home/wasim/Assignment/callback-assignment/upperCase.txt",
//                 "utf-8",
//                 (err, data) => {
//                   if (err) {
//                     console.log(err);
//                   }
//                   fs.writeFile(
//                     "home/wasim/Assignment/callback-assignment/sentences.txt",
//                     data.toLowerCase().split(/[.!?]/).join("\n"),
//                     (err, data) => {
//                       if (err) {
//                         console.error(err);
//                       }
//                     }
//                   );
//                 }
//               );
//             }
//           );
//         }
//       );
//     }
//   );
// }

// problem2();

// const fs = require("fs/promises");
// function promise1(path, files) {
//   fs.access(path + "/files")
//     .then(() => {
//       return createFiles(path + "/files/", files);
//     })
//     .catch((err) => {
//       if (err.code === "ENOENT") {
//         return fs
//           .mkdir(path + "/files")
//           .then(() => {
//             return createFiles(path + "/files/", files);
//           })
//           .catch((err) => {
//             return console.log(err);
//           });
//       } else {
//         console.log(err);
//       }
//     });
// }
// function createFiles(path, files) {
//   for (let i = 1; i <= files; i++) {
//     fs.writeFile(path + `file${i}.json`, "")
//       .catch((err) => console.log(err))
//       .then(() => {
//         console.log(`file${i}.json created`);
//         deleteFiles(path + `file${i}.json`, i);
//       });
//   }
// }

// function deleteFiles(path, file) {
//   fs.unlink(path)
//     .then(() => console.log(`file${file}.json deleted`))
//     .catch((err) => console.error(err));
// }

// promise1("/home/wasim/Assignment/callback-assignment", 3);

// const fs = require("fs/promises");
// const path = require("path");

// function promise1(basePath, files) {
//   const filesPath = path.join(basePath, "files");

//   fs.access(filesPath)
//     .then(() => createFiles(filesPath, files))
//     .then(() => deleteFiles(filesPath, files))
//     .catch((err) => {
//       if (err.code === "ENOENT") {
//         return fs
//           .mkdir(filesPath)
//           .then(() => createFiles(filesPath, files))
//           .then(() => deleteFiles(filesPath, files))
//           .catch((err) => console.error(err));
//       } else {
//         console.error(err);
//       }
//     });
// }

// function createFiles(path, files) {
//   const filePromises = [];

//   for (let i = 1; i <= files; i++) {
//     const promise = fs
//       .writeFile(`${path}/file${i}.json`, "")
//       .then(() => console.log(`file${i}.json created`))
//       .catch((err) => console.error(err));

//     filePromises.push(promise);
//   }

//   return Promise.all(filePromises);
// }

// function deleteFiles(path, files) {
//   const deletePromises = [];

//   for (let i = 1; i <= files; i++) {
//     const promise = fs
//       .unlink(`${path}/file${i}.json`)
//       .then(() => console.log(`file${i}.json deleted`))
//       .catch((err) => console.error(err));

//     deletePromises.push(promise);
//   }

//   return Promise.all(deletePromises);
// }

// promise1("/home/wasim/Assignment/callback-assignment", 3);

const fs = require("fs/promises");
function promise2(path) {
  fs.readFile(path + "/lipsum.txt", "utf-8")
    .then((data) => fs.writeFile(path + "/upperCase.txt", data.toUpperCase()))
    .then(() => fs.appendFile(path + "/fileNames.txt", "upperCase.txt\n"))
    .then(() => fs.readFile(path + "/upperCase.txt", "utf-8"))
    .then((data) =>
      fs.writeFile(
        path + "/sentences.txt",
        data.toLowerCase().split(/[.!?]/).join("\n")
      )
    )
    .then(() => fs.appendFile(path + "/fileNames.txt", "sentences.txt\n"))
    .then(() => fs.readFile(path + "/sentences.txt", "utf-8"))
    .then((data) =>
      fs
        .writeFile(path + "/sorted.txt", data.split(" ").sort().join("\n"))
        .then(() => fs.appendFile(path + "/fileNames.txt", "sorted.txt"))
        .then(() => fs.readFile(path + "/fileNames.txt", "utf-8"))
        .then((data) => {
          const arrayOfFiles = data.trim().split("\n");
          return arrayOfFiles.forEach((file) => fs.unlink(file));
        })
    )
    .catch((err) => console.error(err));
}

promise2("/home/wasim/Assignment/callback-assignment");
