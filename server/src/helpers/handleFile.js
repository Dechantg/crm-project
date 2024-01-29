

const convertCsvToJson = require('./cvsToJsonConversion');
// const convertExcelToJson = require('./excelToJsonConvertion');

const handleFile = async (fileBuffer, fileExtension) => {
  let jsonData;

  if (fileExtension === 'csv') {
    const csvData = fileBuffer.toString('utf8');
    jsonData = await convertCsvToJson(csvData);
  } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
    // jsonData = await convertExcelToJson(fileBuffer);
    console.log('Excel No Longer Supported Please Convert to CSV');
    throw new Error('Excel No Longer Supported Please Convert to CSV');
  } else {
    console.log('Unsupported file format');
    throw new Error('Unsupported file format');
  }

  return jsonData;
};

module.exports = handleFile;
