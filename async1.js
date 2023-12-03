const fs = require("fs").promises;
const path = require("path");

async function createFiles(directory, files) {
  try {
    await fs.mkdir(directory, { recursive: true });
    const promise = Array.from({ length: files }, (_, i) => {
      const filename = `file${i + 1}.json`;
      const filePath = path.join(directory, filename);
      const data = "";
      return fs.writeFile(filePath, data);
    });
    await Promise.all(promise);
    console.log(`Created Files`);
  } catch (error) {
    console.log("Error creating files", error);
  }
}
async function deleteFiles(directory) {
  try {
    const filename = await fs.readdir(directory);
    const deletePromises = filename.map((file) => {
      const filePath = path.join(directory, file);
      return fs.unlink(filePath);
    });
    await Promise.all(deletePromises);
    console.log("Files Deleted");
  } catch (error) {
    console.error("Error deleting files", error);
  }
}
const directory = "Files";
const files = 5;

(async () => {
  await createFiles(directory, files);
  await deleteFiles(directory);
})();
