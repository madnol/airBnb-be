const { readJSON, writeJSON } = require("fs-extra");
const { join } = require("path");

const readDB = async (filepath) => {
  try {
    const fileJSON = await readJSON(filepath);
    return fileJSON;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDB = async (filepath, fileContent) => {
  try {
    await writeJSON(filepath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getPlaces: async () => readDB(filepath),
  writePlaces: async () => writeDB(filepath, fileContent),
};

/* DIFFERNZA TRA THROW ERROR E UN SEMPLICE CONSOLE LOG */
