require('dotenv').config();
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');




const app = express();



app.use(cors({origin: `http://localhost:3000`}));


const uploadSheetsRoute = require('./routes/uploadSheets');
const uploadImageRoute = require('./routes/uploadImage');
const uploadPDF = require('./routes/uploadPDF');
const getPdF = require('./routes/getPdfByPdf');
const getDocumentByUser = require('./routes/getDocumentByUser');
const getImageByUser = require('./routes/getImageByUser');
const getPdfByUser = require('./routes/getPdfByUser');
const getImageByImage = require('./routes/getImageByImage')
const getDocumentByDocument = require('./routes/getDocumentByDocument');
const uploadLicenceeList = require('./routes/uploadLicenceeList');
const getLicenceList = require('./routes/getLicenceList');
const imageTest = require('./routes/imageHelperTest')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use('/upload/sheet', uploadSheetsRoute);
app.use('/upload/image', uploadImageRoute);
app.use('/upload/pdf', uploadPDF);
app.use('/download/pdf', getPdF);
app.use('/getdocument', getDocumentByUser);
app.use('/getimage', getImageByUser);
app.use('/getpdf', getPdfByUser);
app.use('/download/image', getImageByImage);
app.use('/download/document', getDocumentByDocument);
app.use('/upload/licenceelist', uploadLicenceeList);
app.use('/getlicencelist', getLicenceList);
app.use('/upload/imagetest', imageTest);



const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/image.html');
});

app.get('/imagetest', (req, res) => {
  res.sendFile(__dirname + '/imagetest.html');
});

app.get('/pdf', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
});

app.get('/licencee', (req, res) => {
  res.sendFile(__dirname + '/uploadlicencee.html');
});


app.listen(port, host, () => {
  console.log(`Server is running on port ${port} and host ${host}`);
});

