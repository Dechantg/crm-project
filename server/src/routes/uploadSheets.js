

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const uploadMemory = require('../helpers/multerMemory');
const convertCsvToJson = require('../helpers/cvsToJsonConversion');
const convertExcelToJson = require('../helpers/excelToJsonConvertion');
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const addDocument = require('../../database/queries/add_document')

const router = express.Router();

const storagePath = path.join(__dirname, '../../database/documents');

router.post('/', uploadMemory.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    const originalFileName = req.file.originalname
    const fileDescription = req.body.description;
    const userId = 1


    console.log('req.file:', req.file);
    console.log('here is in theory the file description', fileDescription)

    const uniqueFilename = generateUniqueFilename(req.file.originalname);
    const originalFilePath = path.join(storagePath, uniqueFilename);
    await fs.writeFile(originalFilePath, fileBuffer);

    const serverRoot = path.join(__dirname, '../../../');
    const relativeOriginalPath = path.relative(serverRoot, originalFilePath);

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

    console.log("here is the path for my shinny new file", uniqueFilename);
    console.log("here is the original name", originalFileName);

    const querryResult = await addDocument(userId, originalFileName, uniqueFilename, fileDescription)

    console.log("here is the reqerry result data", querryResult)

    res.json(jsonData);
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;