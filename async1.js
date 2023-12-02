const fs = require("fs").promises;

async function createFiles(path, count) {
  try {
    await fs.mkdir(path);

    const promises = Array.from({ length: count }, (_, i) => {
      const filePath = `${path}/file${i + 1}.json`;
      const content = JSON.stringify({ data: 0 });
      return writeFile(filePath, content);
    });

    await Promise.all(promises);
    return `Directory '${path}' created with ${count} JSON files`;
  } catch (error) {
    handleError(error);
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log(`${filePath} created`);
  } catch (error) {
    handleError(error);
  }
}

async function deleteFiles(path) {
  try {
    const files = await fs.readdir(path);
    const deletePromises = files.map((file) => unlink(`${path}/${file}`));

    await Promise.all(deletePromises);
    return `Deleted ${files.length} files from '${path}'.`;
  } catch (error) {
    handleError(error);
  }
}

async function unlink(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`${filePath} deleted`);
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  console.error("Error:", error);
}

async function main() {
  const path = "Files";

  try {
    const createResult = await createFiles(path, 5);
    console.log(createResult);

    const deleteResult = await deleteFiles(path);
    console.log(deleteResult);
  } catch (error) {
    handleError(error);
  }
}

main();
