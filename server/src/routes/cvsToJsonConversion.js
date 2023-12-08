

const csvtojson = require('csvtojson');
const _ = require('lodash');


async function convertCsvToJson(csvBuffer) {
  try {
    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromString(csvBuffer);

    // Transform column headers to camelCase using lodash
    const transformedJsonArray = jsonArray.map(row => {
      const transformedRow = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const snakeCaseKey = _.snakeCase(key);
          transformedRow[snakeCaseKey] = row[key];
        }
      }
      return transformedRow;
    });

    return transformedJsonArray;
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
}

module.exports = convertCsvToJson;