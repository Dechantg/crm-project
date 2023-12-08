require('dotenv').config();
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const convertCsvToJson = require('./routes/cvsToJsonConversion')
const convertExcelToJson = require('./routes/excelToJsonConvertion');
const app = express();




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




const port = process.env.PORT;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    let jsonData;

    if (fileExtension === 'csv') {
      // Handle CSV files using the original string format
      const csvData = fileBuffer.toString('utf8');
      jsonData = await convertCsvToJson(csvData);
    } else if (fileExtension === 'xlsx') {
      // Handle Excel files using the buffer directly
      jsonData = await convertExcelToJson(fileBuffer);
    } else {
      console.log('Unsupported file format');
      res.status(400).send('Unsupported file format');
      return;
    }

    console.log("Here is the object post processing", jsonData)

    res.json(jsonData);
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

