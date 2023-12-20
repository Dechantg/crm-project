const XLSX = require('xlsx');

async function convertExcelToJson(excelBuffer) {
  try {
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const jsonData = [];

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    if (worksheet) {
      const rows = XLSX.utils.sheet_to_json(worksheet);

      // Find all unique column names
      const allColumns = new Set();
      rows.forEach(row => {
        Object.keys(row).forEach(column => {
          allColumns.add(column);
        });
      });

      // Iterate through each row and populate missing columns with null values
      rows.forEach(row => {
        const newRow = {};

        allColumns.forEach(column => {
          newRow[column] = row[column] !== undefined ? row[column] : null;
        });

        jsonData.push(newRow);
      });
    }

    return jsonData;
  } catch (error) {
    console.error('Error converting Excel to JSON:', error);
    throw new Error('Error converting Excel to JSON');
  }
}

module.exports = convertExcelToJson;