const express = require('express');
const uploadMemory = require('../helpers/multerMemory');
const convertCsvToJson = require('../helpers/cvsToJsonConversion');
const convertExcelToJson = require('../helpers/excelToJsonConvertion');
const router = express.Router();



router.post('/', uploadMemory.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    console.log('req.file:', req.file);

    let jsonData;

    if (fileExtension === 'csv') {
      const csvData = fileBuffer.toString('utf8');
      jsonData = await convertCsvToJson(csvData);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      jsonData = await convertExcelToJson(fileBuffer);
    } else {
      console.log('Unsupported file format');
      res.status(400).send('Unsupported file format');
      return;
    }

    res.json(jsonData);
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;