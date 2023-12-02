const fs = require("fs").promises;
const dir = "/home/wasim/Assignment/callback-assignment/";

async function readFile(fileName) {
  try {
    const data = await fs.readFile(`${dir}${fileName}`, "utf-8");
    return data;
  } catch (err) {
    throw err;
  }
}

async function writeFile(fileName, data) {
  try {
    await fs.writeFile(`${dir}${fileName}`, data);
    console.log("writeFile");
  } catch (err) {
    throw err;
  }
}

async function appendFile(fileName, data) {
  try {
    await fs.appendFile(`${dir}${fileName}`, data);
    console.log("appendFile");
  } catch (err) {
    throw err;
  }
}

async function unlink(fileName) {
  try {
    await fs.unlink(`${dir}${fileName}`);
    console.log("unlink");
  } catch (err) {
    throw err;
  }
}

async function async2() {
  try {
    const upperCaseData = await readFile("lipsum.txt");
    await writeFile("upperCase.txt", upperCaseData.toUpperCase());

    await writeFile("fileName.txt", "upperCase.txt\n");

    const sentencesData = await readFile("upperCase.txt");
    const sentences = sentencesData.toLowerCase().split(/[.!?]/).join("\n");
    await writeFile("sentences.txt", sentences);

    await appendFile("fileName.txt", "sentences.txt\n");

    const fileNameData = await readFile("fileName.txt");
    const arrayOfFiles = fileNameData.trim().split("\n");

    const fileContents = await Promise.all(
      arrayOfFiles.map((fileName) => readFile("/" + fileName, "utf-8"))
    );

    const sortedContents = fileContents.sort().join("\n");
    await writeFile("sorted.txt", sortedContents);

    await appendFile("fileName.txt", "sorted.txt\n");

    const finalFileNameData = await readFile("fileName.txt");
    const finalArrayOfFiles = finalFileNameData.split("\n").filter(Boolean);

    await Promise.all(finalArrayOfFiles.map((fileName) => unlink(fileName)));
  } catch (err) {
    console.log(err);
  }
}

async2();
