require('dotenv').config();
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const convertCsvToJson = require('./routes/cvsToJsonConversion')
const convertExcelToJson = require('./routes/excelToJsonConvertion');
const cors = require('cors');




const app = express();


app.use(cors({origin: `http://localhost:3000`}));



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    console.log('req.file:', req.file);


    let jsonData;

    if (fileExtension === 'csv') {
      // Handle CSV files using the original string format
      const csvData = fileBuffer.toString('utf8');
      jsonData = await convertCsvToJson(csvData);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      // Handle Excel files using the buffer directly
      jsonData = await convertExcelToJson(fileBuffer);
    } else {
      console.log('Unsupported file format');
      res.status(400).send('Unsupported file format');
      return;
    }

    // console.log("Here is the object post processing", jsonData)

    res.json(jsonData);
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(port, host, () => {
  console.log(`Server is running on port ${port} and host ${host}`);
});

