require('dotenv').config();
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const convertCsvToJson = require('./helpers/cvsToJsonConversion')
const convertExcelToJson = require('./helpers/excelToJsonConvertion');
const cors = require('cors');




const app = express();



app.use(cors({origin: `http://localhost:3000`}));


const uploadSheetsRoute = require('./routes/uploadSheets')
const uploadImageRoute = require('./routes/uploadImage')
const uploadPDF = require('./routes/uploadPDF')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use('/upload/sheet', uploadSheetsRoute);
app.use('/upload/image', uploadImageRoute);
app.use('/upload/pdf', uploadPDF)


const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/image.html');
});

app.get('/pdf', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
});


app.listen(port, host, () => {
  console.log(`Server is running on port ${port} and host ${host}`);
});

