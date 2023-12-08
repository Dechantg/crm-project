const XLSX = require('xlsx');

async function convertExcelToJson(excelBuffer) {
  try {
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const jsonData = [];

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    if (worksheet) {
      XLSX.utils.sheet_to_json(worksheet).forEach(row => {
        jsonData.push(row);
      });
    }

    return jsonData;
  } catch (error) {
    console.error('Error converting Excel to JSON:', error);
    throw new Error('Error converting Excel to JSON');
  }
}

module.exports = convertExcelToJson;