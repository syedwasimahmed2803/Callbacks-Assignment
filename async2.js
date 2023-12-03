const fs = require("fs").promises;
const path = require("path");

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading file");
    throw error;
  }
}
async function writeFile(filePath, data) {
  try {
    return await fs.writeFile(filePath, data);
  } catch (error) {
    console.error("Error writing file");
    throw error;
  }
}
async function appendFile(filePath, data) {
  try {
    return await fs.appendFile(filePath, data);
  } catch (error) {
    console.error("Error appending file");
    throw error;
  }
}
async function unlink(filePath) {
  try {
    return await fs.unlink(filePath);
  } catch (error) {
    console.error("Error deleting file");
    throw error;
  }
}
async function problem2() {
  try {
    const readLipsum = await readFile("lipsum.txt");
    const upperCaseContent = readLipsum.toUpperCase();
    await writeFile("upperCase.txt", upperCaseContent);
    await appendFile("fileNames.txt", "upperCase.txt\n");
    await writeFile(
      "sentences.txt",
      upperCaseContent.toLowerCase().split(/[.!?]/).join("\n")
    );
    await appendFile("fileNames.txt", "sentences.txt\n");
    const fileNames = ["upperCase.txt", "sentences.txt"];
    const sortedData = await Promise.all(
      fileNames.map(async (file) => {
        const content = await readFile(file);
        return content.split("\n").sort().join("\n");
      })
    );
    await writeFile("sorted.txt", sortedData);
    await appendFile("fileNames.txt", "sorted.txt");
    const deleteNames = (await readFile("fileNames.txt"))
      .split("\n")
      .filter(Boolean);
    await Promise.all(
      deleteNames.map(async (file) => {
        await unlink(file);
      })
    );
  } catch (error) {
    console.error("Error in file operations:", error);
    throw error;
  }
}
problem2();
